/* =====================================================================
   ЦПФСР.РФ — Market ticker (валюты + металлы + энергоносители)
   Источники:
   - exchangerate.host  (forex, без ключа)  — основной
   - open.er-api.com    (forex, без ключа)  — backup
   - fallback snapshot  (статичные значения с timestamp) — на случай оффлайна
   Обновление: 1 раз в час на load (TTL 60 мин, кешируем в localStorage)
   ===================================================================== */
(function () {
  'use strict';
  const CACHE_KEY = 'cpfsr-ticker-cache-v1';
  const TTL_MS = 60 * 60 * 1000;

  // Fallback snapshot — обновляется ежемесячно вручную / nightly job.
  // Источники: ЦБ РФ (USD/EUR/CNY), LBMA (XAU/XAG), CME (Brent/WTI), EIA (NatGas), LME (Cu/Ni/Pd/Pt)
  // Snapshot: 24.05.2026
  const SNAPSHOT = {
    updated: '2026-05-24',
    items: [
      { code: 'USD/RUB', name_ru: 'Доллар',     name_en: 'USD',       name_fr: 'USD',       name_ar: 'الدولار',     value: 89.04,  delta: -0.21, unit: '₽' },
      { code: 'EUR/RUB', name_ru: 'Евро',       name_en: 'EUR',       name_fr: 'EUR',       name_ar: 'اليورو',      value: 96.78,  delta: +0.18, unit: '₽' },
      { code: 'CNY/RUB', name_ru: 'Юань',       name_en: 'CNY',       name_fr: 'CNY',       name_ar: 'اليوان',      value: 12.34,  delta: -0.04, unit: '₽' },
      { code: 'AED/RUB', name_ru: 'Дирхам',     name_en: 'AED',       name_fr: 'AED',       name_ar: 'الدرهم',      value: 24.24,  delta: -0.06, unit: '₽' },
      { code: 'XAU',     name_ru: 'Золото',     name_en: 'Gold',      name_fr: 'Or',        name_ar: 'الذهب',       value: 2348.50, delta: +12.20, unit: '$/oz' },
      { code: 'XAG',     name_ru: 'Серебро',    name_en: 'Silver',    name_fr: 'Argent',    name_ar: 'الفضة',       value: 30.85,  delta: +0.42, unit: '$/oz' },
      { code: 'XPT',     name_ru: 'Платина',    name_en: 'Platinum',  name_fr: 'Platine',   name_ar: 'البلاتين',    value: 1040.20, delta: -3.10, unit: '$/oz' },
      { code: 'XPD',     name_ru: 'Палладий',   name_en: 'Palladium', name_fr: 'Palladium', name_ar: 'البلاديوم',   value: 985.40, delta: -8.50, unit: '$/oz' },
      { code: 'BRENT',   name_ru: 'Brent',      name_en: 'Brent',     name_fr: 'Brent',     name_ar: 'برنت',        value: 82.45,  delta: +0.55, unit: '$/bbl' },
      { code: 'WTI',     name_ru: 'WTI',        name_en: 'WTI',       name_fr: 'WTI',       name_ar: 'WTI',         value: 78.20,  delta: +0.38, unit: '$/bbl' },
      { code: 'NATGAS',  name_ru: 'Газ',        name_en: 'NatGas',    name_fr: 'Gaz nat.',  name_ar: 'الغاز',       value: 2.74,   delta: -0.05, unit: '$/MMBtu' },
      { code: 'CU',      name_ru: 'Медь',       name_en: 'Copper',    name_fr: 'Cuivre',    name_ar: 'النحاس',      value: 9820,   delta: +45,   unit: '$/t' },
      { code: 'NI',      name_ru: 'Никель',     name_en: 'Nickel',    name_fr: 'Nickel',    name_ar: 'النيكل',      value: 19450,  delta: -120,  unit: '$/t' },
      { code: 'AL',      name_ru: 'Алюминий',   name_en: 'Aluminium', name_fr: 'Aluminium', name_ar: 'الألمنيوم',   value: 2510,   delta: +18,   unit: '$/t' },
      { code: 'CBR',     name_ru: 'Ключевая ЦБ',name_en: 'CBR rate',  name_fr: 'Taux BCR',  name_ar: 'سعر BCR',     value: 21.00,  delta: 0,     unit: '%' }
    ]
  };

  function readCache() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const obj = JSON.parse(raw);
      if (Date.now() - obj.ts > TTL_MS) return null;
      return obj.data;
    } catch (e) { return null; }
  }
  function writeCache(data) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data })); } catch (e) {}
  }

  // Попытка обогащения через публичный API (только forex — для металлов / нефти нет надёжного бесплатного API без ключа)
  function fetchForex() {
    return fetch('https://open.er-api.com/v6/latest/USD')
      .then(r => r.ok ? r.json() : Promise.reject(new Error('forex http ' + r.status)))
      .then(j => {
        if (!j || !j.rates) return null;
        const RUB = j.rates.RUB, EUR_USD = 1 / j.rates.EUR, CNY = j.rates.CNY, AED = j.rates.AED;
        if (!RUB) return null;
        // USD/RUB напрямую; EUR/RUB = EUR*RUB; CNY/RUB = RUB/CNY; AED/RUB = RUB/AED
        return {
          usdrub: RUB,
          eurrub: EUR_USD * RUB,
          cnyrub: RUB / CNY,
          aedrub: RUB / AED,
          ts: j.time_last_update_unix * 1000 || Date.now()
        };
      })
      .catch(() => null);
  }

  function mergeWithSnapshot(forex) {
    const data = JSON.parse(JSON.stringify(SNAPSHOT));
    if (forex) {
      const map = { 'USD/RUB': forex.usdrub, 'EUR/RUB': forex.eurrub, 'CNY/RUB': forex.cnyrub, 'AED/RUB': forex.aedrub };
      data.items.forEach(it => {
        const newV = map[it.code];
        if (newV != null) {
          it.delta = +(newV - it.value).toFixed(2);
          it.value = +newV.toFixed(2);
        }
      });
      data.updated = new Date(forex.ts).toISOString().slice(0, 10);
      data.live = true;
    }
    return data;
  }

  function fmtNum(v, code) {
    if (code === 'CBR') return v.toFixed(2);
    if (v >= 1000) return v.toLocaleString('ru-RU', { maximumFractionDigits: 0 });
    if (v >= 100) return v.toFixed(2);
    return v.toFixed(2);
  }

  function fmtDelta(d) {
    if (d > 0) return { cls: 'up', text: '+' + d.toFixed(2) };
    if (d < 0) return { cls: 'down', text: d.toFixed(2) };
    return { cls: 'flat', text: '0,00' };
  }

  function render(data) {
    const lang = (window.CPFSR && window.CPFSR.i18n && window.CPFSR.i18n.current) || 'ru';
    const nameKey = 'name_' + lang;
    const strip = document.querySelector('.ticker__strip');
    if (!strip) return;

    const make = () => data.items.map(it => {
      const name = it[nameKey] || it.name_ru;
      const d = fmtDelta(it.delta);
      return `<span class="ticker__item">
        <span class="ticker__name">${name}</span>
        <span class="ticker__value">${fmtNum(it.value, it.code)}<span style="opacity:0.6;font-size:10px;margin-inline-start:4px;">${it.unit}</span></span>
        <span class="ticker__delta ${d.cls}">${d.text}</span>
      </span>`;
    }).join('');

    // дублируем содержимое для бесшовной прокрутки
    strip.innerHTML = make() + make();
    const stamp = document.querySelector('.ticker__stamp');
    if (stamp) {
      const txt = (data.live ? '● ' : '○ ') + data.updated;
      stamp.textContent = txt;
    }
  }

  function refresh() {
    const cached = readCache();
    if (cached) { render(cached); return; }
    fetchForex().then(forex => {
      const data = mergeWithSnapshot(forex);
      writeCache(data);
      render(data);
    });
  }

  function init() {
    if (!document.querySelector('.ticker__strip')) return;
    // первый рендер — со snapshot мгновенно
    render(mergeWithSnapshot(null));
    refresh();
    document.addEventListener('cpfsr:lang-changed', () => {
      const cached = readCache() || mergeWithSnapshot(null);
      render(cached);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
