/* =====================================================================
   ЦПФСР.РФ — Client-side PIN auth (overlay)
   Блокирует сайт до ввода 6-значного PIN.
   PIN хеш сравнивается с window.CPFSR_AUTH.PIN_HASH (см. auth-config.js).
   Сессия сохраняется в localStorage на N дней (SESSION_DAYS).
   ===================================================================== */
(function () {
  'use strict';
  if (!window.CPFSR_AUTH || !window.CPFSR_AUTH.PIN_HASH) return;
  const KEY = 'cpfsr-auth-session';
  const cfg = window.CPFSR_AUTH;

  /* ---------- Session check ---------- */
  function isAuthed() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return false;
      const s = JSON.parse(raw);
      const expiresAt = (s.ts || 0) + cfg.SESSION_DAYS * 86400000;
      return s.valid === true && Date.now() < expiresAt;
    } catch (e) { return false; }
  }
  function setAuthed() {
    try { localStorage.setItem(KEY, JSON.stringify({ ts: Date.now(), valid: true })); } catch (e) {}
  }

  /* ---------- SHA-256 (subtle.crypto) ---------- */
  async function sha256(text) {
    const buf = new TextEncoder().encode(text);
    const hashBuf = await crypto.subtle.digest('SHA-256', buf);
    return Array.from(new Uint8Array(hashBuf))
      .map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /* ---------- Overlay ---------- */
  function buildOverlay() {
    const ov = document.createElement('div');
    ov.id = 'cpfsr-auth-overlay';
    ov.innerHTML = `
      <style>
        #cpfsr-auth-overlay { position: fixed; inset: 0; background: #0B2B5C; z-index: 99999; display: flex; align-items: center; justify-content: center; font-family: 'Inter', system-ui, sans-serif; }
        #cpfsr-auth-overlay .auth-card { background: #fff; padding: 48px 36px; border-radius: 18px; box-shadow: 0 20px 60px rgba(0,0,0,.3); width: 100%; max-width: 380px; text-align: center; }
        #cpfsr-auth-overlay .auth-logo { width: 64px; height: 64px; margin: 0 auto 16px; }
        #cpfsr-auth-overlay h1 { font-size: 20px; color: #0B2B5C; margin: 0 0 8px; font-weight: 700; }
        #cpfsr-auth-overlay .auth-sub { font-size: 13px; color: #6C7280; margin: 0 0 24px; }
        #cpfsr-auth-overlay .pin-display { display: flex; gap: 10px; justify-content: center; margin-bottom: 24px; }
        #cpfsr-auth-overlay .pin-dot { width: 14px; height: 14px; border-radius: 50%; border: 2px solid #C9A961; transition: background .15s; }
        #cpfsr-auth-overlay .pin-dot.filled { background: #C9A961; }
        #cpfsr-auth-overlay .pin-dot.error { border-color: #c0392b; background: #c0392b; animation: shake .35s; }
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 50%{transform:translateX(6px)} 75%{transform:translateX(-3px)} }
        #cpfsr-auth-overlay .numpad { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        #cpfsr-auth-overlay .key { font-size: 22px; font-weight: 600; padding: 18px 0; border: 1px solid #E5E7EB; border-radius: 12px; background: #F9FAFB; color: #0B2B5C; cursor: pointer; transition: background .12s, transform .08s; user-select: none; }
        #cpfsr-auth-overlay .key:hover { background: #F1F3F6; }
        #cpfsr-auth-overlay .key:active { transform: scale(.95); background: #E4C892; }
        #cpfsr-auth-overlay .key-action { color: #6C7280; font-size: 14px; font-weight: 500; }
        #cpfsr-auth-overlay .auth-forgot { display: block; margin: 22px auto 0; background: none; border: none; color: #6C7280; font-size: 13px; cursor: pointer; text-decoration: underline; }
        #cpfsr-auth-overlay .auth-forgot:hover { color: #0B2B5C; }
        #cpfsr-auth-overlay .auth-msg { min-height: 18px; font-size: 12px; color: #c0392b; margin-top: 12px; }
        /* Reset form */
        #cpfsr-auth-overlay .reset-pane { display: none; text-align: left; }
        #cpfsr-auth-overlay .reset-pane label { display: block; font-size: 13px; color: #0B2B5C; margin: 14px 0 6px; font-weight: 500; }
        #cpfsr-auth-overlay .reset-pane input { width: 100%; padding: 12px 14px; border: 1px solid #E5E7EB; border-radius: 10px; font-size: 16px; box-sizing: border-box; }
        #cpfsr-auth-overlay .reset-pane button.primary { width: 100%; padding: 14px; background: #0B2B5C; color: #fff; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; margin-top: 18px; }
        #cpfsr-auth-overlay .reset-pane button.primary:disabled { background: #6C7280; cursor: not-allowed; }
        #cpfsr-auth-overlay .reset-pane .back { display: block; margin: 14px auto 0; background: none; border: none; color: #6C7280; font-size: 13px; cursor: pointer; }
        #cpfsr-auth-overlay .reset-pane .ok-msg { background: #F0FDF4; color: #166534; padding: 12px; border-radius: 10px; font-size: 13px; margin-top: 12px; display: none; }
      </style>
      <div class="auth-card">
        <div class="auth-logo">
          <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="48" height="48" rx="6" fill="#0B2B5C"/>
            <g transform="translate(13, 11)">
              <rect x="0" y="0" width="4.3" height="26" fill="#FFFFFF"/>
              <rect x="0" y="0" width="16.3" height="4.3" fill="#FFFFFF"/>
              <rect x="12" y="0" width="4.3" height="13" fill="#FFFFFF"/>
              <rect x="0" y="10.7" width="16.3" height="4.3" fill="#FFFFFF"/>
            </g>
            <rect x="36" y="9" width="3" height="3" fill="#C9A961"/>
          </svg>
        </div>

        <div class="pin-pane">
          <h1>ЦПФСР.РФ</h1>
          <p class="auth-sub">Введите PIN-код для доступа</p>
          <div class="pin-display" id="pin-display">
            ${Array(6).fill('<div class="pin-dot"></div>').join('')}
          </div>
          <div class="numpad">
            ${[1,2,3,4,5,6,7,8,9].map(n => `<button class="key" data-digit="${n}">${n}</button>`).join('')}
            <button class="key key-action" data-action="clear">⌫</button>
            <button class="key" data-digit="0">0</button>
            <button class="key key-action" data-action="submit">→</button>
          </div>
          <div class="auth-msg" id="auth-msg"></div>
          <button class="auth-forgot" id="auth-forgot">Забыли PIN? — отправить запрос на email</button>
        </div>

        <div class="reset-pane" id="reset-pane">
          <h1 style="text-align:center">Сменить PIN</h1>
          <p class="auth-sub" style="text-align:center">Заявка придёт на ${cfg.RESET_EMAIL}</p>
          <label>Желаемый новый PIN (6 цифр)</label>
          <input type="text" id="reset-newpin" maxlength="6" inputmode="numeric" pattern="[0-9]{6}" placeholder="Например, 000000">
          <label>Ваше имя (для подтверждения)</label>
          <input type="text" id="reset-name" placeholder="Аслан">
          <button class="primary" id="reset-submit">Отправить запрос</button>
          <div class="ok-msg" id="reset-ok">✓ Запрос отправлен. Проверьте почту ${cfg.RESET_EMAIL} — придёт письмо с новым PIN и инструкцией активации.</div>
          <button class="back" id="reset-back">← Назад к вводу PIN</button>
        </div>
      </div>
    `;
    document.body.appendChild(ov);
    return ov;
  }

  function init() {
    if (isAuthed()) return;
    /* Hide page until auth */
    document.documentElement.style.overflow = 'hidden';
    const ov = buildOverlay();

    let pin = '';
    const dots = ov.querySelectorAll('.pin-dot');
    const msg = ov.querySelector('#auth-msg');
    const pinPane = ov.querySelector('.pin-pane');
    const resetPane = ov.querySelector('#reset-pane');

    function renderDots() {
      dots.forEach((d, i) => {
        d.classList.toggle('filled', i < pin.length);
        d.classList.remove('error');
      });
      msg.textContent = '';
    }
    async function trySubmit() {
      if (pin.length !== 6) {
        msg.textContent = 'Введите 6 цифр';
        return;
      }
      const hash = await sha256(pin);
      if (hash === cfg.PIN_HASH) {
        setAuthed();
        ov.remove();
        document.documentElement.style.overflow = '';
      } else {
        dots.forEach(d => d.classList.add('error'));
        msg.textContent = 'Неверный PIN';
        pin = '';
        setTimeout(renderDots, 500);
      }
    }

    /* Numpad clicks */
    ov.querySelectorAll('[data-digit]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (pin.length < 6) {
          pin += btn.getAttribute('data-digit');
          renderDots();
          if (pin.length === 6) setTimeout(trySubmit, 150);
        }
      });
    });
    ov.querySelector('[data-action="clear"]').addEventListener('click', () => {
      pin = pin.slice(0, -1); renderDots();
    });
    ov.querySelector('[data-action="submit"]').addEventListener('click', trySubmit);

    /* Keyboard support */
    document.addEventListener('keydown', (e) => {
      if (!document.getElementById('cpfsr-auth-overlay')) return;
      if (e.key >= '0' && e.key <= '9' && pin.length < 6) {
        pin += e.key; renderDots();
        if (pin.length === 6) setTimeout(trySubmit, 150);
      } else if (e.key === 'Backspace') {
        pin = pin.slice(0, -1); renderDots();
      } else if (e.key === 'Enter') {
        trySubmit();
      }
    });

    /* Forgot PIN */
    ov.querySelector('#auth-forgot').addEventListener('click', () => {
      pinPane.style.display = 'none';
      resetPane.style.display = 'block';
    });
    ov.querySelector('#reset-back').addEventListener('click', () => {
      pinPane.style.display = 'block';
      resetPane.style.display = 'none';
    });
    ov.querySelector('#reset-submit').addEventListener('click', async () => {
      const newpin = ov.querySelector('#reset-newpin').value.trim();
      const name = ov.querySelector('#reset-name').value.trim() || 'Не указано';
      if (!/^[0-9]{6}$/.test(newpin)) {
        alert('PIN должен состоять из 6 цифр');
        return;
      }
      const btn = ov.querySelector('#reset-submit');
      btn.disabled = true; btn.textContent = 'Отправка...';

      const payload = {
        _subject: 'ЦПФСР.РФ — запрос смены PIN',
        _captcha: 'false',
        _template: 'table',
        Сайт: 'https://dpfsd.ru',
        Заявитель: name,
        'Желаемый PIN': newpin,
        'Текущий хеш в коде': cfg.PIN_HASH.substring(0, 12) + '…',
        Время: new Date().toISOString(),
        'User-Agent': navigator.userAgent
      };

      try {
        const resp = await fetch(cfg.RESET_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (resp.ok) {
          ov.querySelector('#reset-ok').style.display = 'block';
          btn.textContent = '✓ Отправлено';
        } else {
          btn.disabled = false;
          btn.textContent = 'Отправить запрос';
          alert('Ошибка отправки. Попробуйте позже или напишите напрямую на ' + cfg.RESET_EMAIL);
        }
      } catch (e) {
        btn.disabled = false;
        btn.textContent = 'Отправить запрос';
        alert('Сеть недоступна. Напишите напрямую на ' + cfg.RESET_EMAIL);
      }
    });

    /* Focus first key for keyboard */
    setTimeout(() => ov.querySelector('[data-digit="1"]').focus(), 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
