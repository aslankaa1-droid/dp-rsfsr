/* Access gate — клиентский overlay (SHA-256, сессия 30 дней). Пароль у владельца.
   Правила надёжности:
   — страница не остаётся скрытой ни при какой ошибке: сторож снимает маскировку;
   — если браузер не даёт crypto.subtle (открыто по http, старый движок),
     об этом сообщается прямо, а не молча;
   — ввод рассчитан на телефон: шрифт 16 px (iOS не увеличивает страницу),
     явная кнопка «Войти», цель нажатия не меньше 48 px. */
(function () {
  'use strict';
  var HASHES = [
    '30b2148f74281c67f9c7d55a416590b05e36243b5317226de476dd26cbe1823f'
  ];
  var KEY = 'akaa-gate', DAYS = 30, LEN = 10, STYLE_ID = 'akaa-gate-style';

  function authed() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY) || '{}');
      return s.ok === true && Date.now() < (s.ts + DAYS * 86400000);
    } catch (e) { return false; }
  }
  function unmask() {
    var s = document.getElementById(STYLE_ID);
    if (s && s.parentNode) s.parentNode.removeChild(s);
  }
  if (authed()) return;

  var st = document.createElement('style');
  st.id = STYLE_ID;
  st.textContent = 'html{visibility:hidden!important}#akaa-gate,#akaa-gate *{visibility:visible!important}';
  (document.head || document.documentElement).appendChild(st);

  /* Сторож: если через 6 секунд окна ввода на странице нет — снять маскировку,
     чтобы посетитель не смотрел в пустой экран. */
  setTimeout(function () {
    if (!document.getElementById('akaa-gate')) unmask();
  }, 6000);

  function sha(t) {
    var c = window.crypto || window.msCrypto;
    if (!c || !c.subtle || !c.subtle.digest || !window.TextEncoder) return null;
    return c.subtle.digest('SHA-256', new TextEncoder().encode(t)).then(function (h) {
      var a = new Uint8Array(h), o = '';
      for (var i = 0; i < a.length; i++) o += a[i].toString(16).padStart(2, '0');
      return o;
    });
  }

  function build() {
    try {
      var ov = document.createElement('div');
      ov.id = 'akaa-gate';
      ov.setAttribute('style',
        'position:fixed;inset:0;z-index:2147483647;background:#0b1220;display:flex;' +
        'align-items:center;justify-content:center;padding:16px;' +
        'padding-bottom:calc(16px + env(safe-area-inset-bottom));' +
        'overflow:auto;-webkit-overflow-scrolling:touch;' +
        'font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif');
      ov.innerHTML =
        '<div style="background:#fff;padding:32px 24px;border-radius:16px;max-width:360px;' +
          'width:100%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.45);box-sizing:border-box">' +
        '<h1 style="font-size:18px;margin:0 0 6px;color:#0b1220;font-weight:700">Доступ по паролю</h1>' +
        '<p style="font-size:14px;color:#667085;margin:0 0 18px;line-height:1.4">Введите пароль</p>' +
        '<input id="akaa-pin" type="password" inputmode="numeric" autocomplete="off" ' +
          'autocapitalize="off" autocorrect="off" spellcheck="false" maxlength="10" ' +
          'aria-label="Пароль" ' +
          'style="width:100%;padding:14px;font-size:18px;text-align:center;letter-spacing:4px;' +
          'border:1px solid #ccd0dd;border-radius:10px;box-sizing:border-box;outline:none;' +
          'min-height:52px;-webkit-appearance:none">' +
        '<button id="akaa-go" type="button" ' +
          'style="width:100%;margin-top:12px;padding:14px;font-size:16px;font-weight:600;' +
          'min-height:52px;border:none;border-radius:10px;background:#0b1220;color:#fff;' +
          'cursor:pointer;-webkit-appearance:none">Войти</button>' +
        '<div id="akaa-msg" role="status" aria-live="polite" ' +
          'style="min-height:18px;color:#c0392b;font-size:13px;margin-top:10px;line-height:1.35"></div></div>';
      document.body.appendChild(ov);

      var inp = ov.querySelector('#akaa-pin');
      var msg = ov.querySelector('#akaa-msg');
      var go = ov.querySelector('#akaa-go');
      try { inp.focus(); } catch (e) {}

      var busy = false;
      function open() {
        try { localStorage.setItem(KEY, JSON.stringify({ ok: true, ts: Date.now() })); } catch (e) {}
        unmask();
        if (ov.parentNode) ov.parentNode.removeChild(ov);
      }
      function check() {
        if (busy) return;
        var v = (inp.value || '').replace(/\s+/g, '');
        if (v.length < LEN) { msg.textContent = 'Пароль из ' + LEN + ' цифр'; return; }
        var p = sha(v);
        if (!p) {
          msg.textContent = 'Браузер не поддерживает проверку пароля. ' +
                            'Откройте страницу по адресу https://dpfsd.ru';
          return;
        }
        busy = true;
        p.then(function (h) {
          if (HASHES.indexOf(h) >= 0) { open(); return; }
          msg.textContent = 'Неверный пароль';
          inp.value = '';
          busy = false;
          try { inp.focus(); } catch (e) {}
        }).catch(function () {
          msg.textContent = 'Не удалось проверить пароль. Обновите страницу.';
          busy = false;
        });
      }
      inp.addEventListener('input', function () {
        msg.textContent = '';
        if (inp.value.replace(/\s+/g, '').length >= LEN) check();
      });
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') check(); });
      go.addEventListener('click', check);
    } catch (e) {
      /* Гейт не построился — лучше показать страницу, чем пустой экран */
      unmask();
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
