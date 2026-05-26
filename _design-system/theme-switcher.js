/* =====================================================================
   ЦПФСР.РФ — Theme switcher
   3 темы: light / dark / sepia + системная авто-детекция
   ===================================================================== */
(function () {
  'use strict';
  const KEY = 'cpfsr-theme';
  const THEMES = ['light', 'dark', 'sepia'];

  function getStored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setStored(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }
  function systemPref() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function apply(theme) {
    const t = THEMES.indexOf(theme) >= 0 ? theme : 'light';
    document.documentElement.setAttribute('data-theme', t);
    document.documentElement.classList.remove('theme-loading');
    document.querySelectorAll('[data-theme-option]').forEach(el => {
      el.classList.toggle('is-active', el.getAttribute('data-theme-option') === t);
    });
    // обновим meta theme-color
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      const colors = { light: '#FAFBFC', dark: '#0A0F1F', sepia: '#F4ECD8' };
      meta.setAttribute('content', colors[t]);
    }
  }

  const initial = getStored() || systemPref();
  document.documentElement.classList.add('theme-loading');
  apply(initial);

  // следить за системной темой если пользователь не выбрал явно
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!getStored()) apply(e.matches ? 'dark' : 'light');
    });
  }

  // публичный API
  window.CPFSR = window.CPFSR || {};
  window.CPFSR.theme = {
    get: () => document.documentElement.getAttribute('data-theme') || 'light',
    set: (t) => { setStored(t); apply(t); },
    cycle: () => {
      const cur = window.CPFSR.theme.get();
      const next = THEMES[(THEMES.indexOf(cur) + 1) % THEMES.length];
      window.CPFSR.theme.set(next);
    },
    list: () => THEMES.slice()
  };

  // делегирование клика на data-theme-option (после загрузки DOM)
  document.addEventListener('click', (e) => {
    const opt = e.target.closest('[data-theme-option]');
    if (opt) {
      e.preventDefault();
      window.CPFSR.theme.set(opt.getAttribute('data-theme-option'));
      const menu = opt.closest('.menu');
      if (menu) menu.classList.remove('open');
    }
    const cycle = e.target.closest('[data-theme-cycle]');
    if (cycle) {
      e.preventDefault();
      window.CPFSR.theme.cycle();
    }
  });
})();
