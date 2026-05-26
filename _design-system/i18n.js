/* =====================================================================
   ЦПФСР.РФ — i18n engine (inline-data driven, file:// compatible)
   Данные подгружаются из window.CPFSR_I18N_DATA (см. i18n-data.js)
   Никаких fetch — работает по двойному клику HTML.
   ===================================================================== */
(function () {
  'use strict';
  const KEY = 'cpfsr-lang';
  const DEFAULT = 'ru';
  const SUPPORTED = ['ru', 'en', 'fr', 'ar'];
  const RTL = ['ar'];

  function getStored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setStored(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }
  function browserLang() {
    const nav = (navigator.language || 'ru').toLowerCase().split('-')[0];
    return SUPPORTED.indexOf(nav) >= 0 ? nav : DEFAULT;
  }
  function getByPath(obj, path) {
    return path.split('.').reduce((o, k) => (o && o[k] != null) ? o[k] : null, obj);
  }

  function getDict(lang) {
    const data = window.CPFSR_I18N_DATA || {};
    return data[lang] || data[DEFAULT] || null;
  }

  function apply(lang) {
    let target = getDict(lang);
    if (!target) {
      console.warn('[i18n] dictionary missing for', lang, '— falling back to', DEFAULT);
      lang = DEFAULT;
      target = getDict(DEFAULT);
      if (!target) return;
    }
    const meta = target._meta || {};
    document.documentElement.lang = meta.lang || lang;
    document.documentElement.dir = meta.dir || (RTL.indexOf(lang) >= 0 ? 'rtl' : 'ltr');

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = getByPath(target, key);
      if (val != null) {
        if (el.hasAttribute('data-i18n-html')) el.innerHTML = val;
        else el.textContent = val;
      }
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const spec = el.getAttribute('data-i18n-attr');
      spec.split(',').forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s.trim());
        const val = getByPath(target, key);
        if (val != null && attr) el.setAttribute(attr, val);
      });
    });

    document.querySelectorAll('[data-lang-option]').forEach(el => {
      el.classList.toggle('is-active', el.getAttribute('data-lang-option') === lang);
    });

    window.CPFSR = window.CPFSR || {};
    window.CPFSR.i18n.current = lang;
    document.dispatchEvent(new CustomEvent('cpfsr:lang-changed', { detail: { lang } }));
  }

  /* Реестр переведённых документов. Берётся из window.CPFSR_TRANSLATIONS
     (заполняется автоматически build-скриптом при сборке HTML × 3 языка). */
  function getTranslationsRegistry() {
    return window.CPFSR_TRANSLATIONS || {};
  }
  function currentRelPath() {
    // path относительно корня проекта (по meta[cpfsr-root])
    const root = (document.querySelector('meta[name="cpfsr-root"]') || {}).content || './';
    const upCount = (root.match(/\.\./g) || []).length;
    const path = decodeURIComponent(window.location.pathname);
    const parts = path.split('/').filter(Boolean);
    // Файл в конце пути, его относительный путь = последние (1 + upCount) сегменты
    return parts.slice(parts.length - 1 - upCount).join('/');
  }
  function isOnTranslated() {
    return /\/_translations\/(ru|en|fr|ar)\//.test(window.location.pathname);
  }
  function buildUrl(lang) {
    const root = (document.querySelector('meta[name="cpfsr-root"]') || {}).content || './';
    // если уже на /_translations/.../ — вычисляем base через два-три уровня вверх
    const here = window.location.href;
    const pathDecoded = decodeURIComponent(window.location.pathname);
    const tMatch = pathDecoded.match(/^(.*?)\/_translations\/(?:ru|en|fr|ar)\/(.*)$/);
    let rel, baseFolder;
    if (tMatch) {
      baseFolder = tMatch[1];
      rel = tMatch[2];
    } else {
      // root относительно текущей страницы: лежит в parts[..N-upCount-1]
      const upCount = (root.match(/\.\./g) || []).length;
      const parts = pathDecoded.split('/').filter(Boolean);
      baseFolder = '/' + parts.slice(0, parts.length - 1 - upCount).join('/');
      rel = parts.slice(parts.length - 1 - upCount).join('/');
    }
    const newPath = (lang === 'ru') ? (baseFolder + '/' + rel) : (baseFolder + '/_translations/' + lang + '/' + rel);
    return new URL(newPath.replace(/\/+/g, '/'), here).href;
  }
  function set(lang) {
    if (SUPPORTED.indexOf(lang) < 0) lang = DEFAULT;
    setStored(lang);
    apply(lang);
    // Редирект, только если конкретный документ есть в реестре переводов
    const registry = getTranslationsRegistry();
    const rel = currentRelPath();
    const available = registry[rel] || [];
    if (lang === 'ru' && isOnTranslated()) {
      // Возврат к оригиналу
      const target = buildUrl('ru');
      if (target && target !== window.location.href) { window.location.href = target; }
      return;
    }
    if (lang !== 'ru' && available.indexOf(lang) >= 0) {
      const target = buildUrl(lang);
      if (target && target !== window.location.href) { window.location.href = target; }
    }
    // иначе — оставляем на странице, UI уже переведён через apply()
  }

  window.CPFSR = window.CPFSR || {};
  window.CPFSR.i18n = {
    supported: SUPPORTED.slice(),
    current: DEFAULT,
    set: set,
    t: (key) => {
      const d = getDict(window.CPFSR.i18n.current);
      return d ? getByPath(d, key) : null;
    },
    available: () => Object.keys(window.CPFSR_I18N_DATA || {})
  };

  document.addEventListener('click', (e) => {
    const opt = e.target.closest('[data-lang-option]');
    if (opt) {
      e.preventDefault();
      set(opt.getAttribute('data-lang-option'));
      const menu = opt.closest('.menu');
      if (menu) menu.classList.remove('open');
    }
  });

  function init() {
    if (!window.CPFSR_I18N_DATA) {
      console.error('[i18n] window.CPFSR_I18N_DATA is missing. Подключите _design-system/i18n-data.js ДО i18n.js');
      return;
    }
    const start = getStored() || browserLang();
    set(start);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
