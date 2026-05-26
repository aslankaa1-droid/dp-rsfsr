/* =====================================================================
   ЦПФСР.РФ — UI helpers: меню, drawer, back-to-top, scrolled top-bar
   ===================================================================== */
(function () {
  'use strict';

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else fn();
  }

  onReady(() => {
    // ===== sticky top-bar shadow =====
    const topBar = document.querySelector('.top-bar');
    if (topBar) {
      const onScroll = () => topBar.classList.toggle('scrolled', window.scrollY > 8);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    // ===== back-to-top =====
    const back = document.querySelector('.back-to-top');
    if (back) {
      const onScrollB = () => back.classList.toggle('visible', window.scrollY > 600);
      window.addEventListener('scroll', onScrollB, { passive: true });
      back.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
      onScrollB();
    }

    // ===== dropdown menus =====
    document.querySelectorAll('[data-menu-trigger]').forEach(trigger => {
      const target = document.querySelector(trigger.getAttribute('data-menu-trigger'));
      if (!target) return;
      trigger.setAttribute('aria-haspopup', 'true');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const open = target.classList.toggle('open');
        trigger.setAttribute('aria-expanded', String(open));
        document.querySelectorAll('.menu.open').forEach(m => { if (m !== target) m.classList.remove('open'); });
      });
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.menu') && !e.target.closest('[data-menu-trigger]')) {
        document.querySelectorAll('.menu.open').forEach(m => m.classList.remove('open'));
        document.querySelectorAll('[data-menu-trigger][aria-expanded="true"]').forEach(t => t.setAttribute('aria-expanded', 'false'));
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.menu.open, .drawer.open, .drawer-overlay.open, .modal-bg.open').forEach(el => el.classList.remove('open'));
      }
    });

    // ===== mobile drawer =====
    const burger = document.querySelector('[data-drawer-trigger]');
    const drawer = document.querySelector('.drawer');
    const overlay = document.querySelector('.drawer-overlay');
    const close = document.querySelectorAll('[data-drawer-close]');
    function openDrawer() { drawer && drawer.classList.add('open'); overlay && overlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function closeDrawer() { drawer && drawer.classList.remove('open'); overlay && overlay.classList.remove('open'); document.body.style.overflow = ''; }
    if (burger) burger.addEventListener('click', openDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);
    close.forEach(b => b.addEventListener('click', closeDrawer));

    // ===== reveal on scroll (IntersectionObserver) =====
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(en => {
          if (en.isIntersecting) {
            en.target.classList.add('fade-in-up');
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
      document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
    }
  });
})();
