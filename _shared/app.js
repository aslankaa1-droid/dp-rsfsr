/* ============================================================
   ЦП РСФСР — Общая логика интерфейса
   - Темы: daylight / midnight / sepia / contrast
   - Размер шрифта: normal / large / xlarge
   - Reveal анимации при прокрутке (IntersectionObserver)
   - Scroll progress bar
   - Активный пункт навигации
   - Модальное окно для просмотра документов
   - Smooth scroll, mobile burger
   ============================================================ */

(function(global) {
  const Theme = {
    set(name) {
      const valid = ['daylight', 'midnight', 'sepia', 'contrast'];
      if (!valid.includes(name)) name = 'daylight';
      document.documentElement.setAttribute('data-theme', name);
      document.querySelectorAll('[data-theme-btn]').forEach(b => {
        b.classList.toggle('active', b.dataset.themeBtn === name);
      });
      try { localStorage.setItem('rsfsr-theme', name); } catch(e) {}
    },
    init() {
      let t = 'daylight';
      try { t = localStorage.getItem('rsfsr-theme') || 'daylight'; } catch(e) {}
      this.set(t);
      document.querySelectorAll('[data-theme-btn]').forEach(b => {
        b.addEventListener('click', () => this.set(b.dataset.themeBtn));
      });
    }
  };

  const FontScale = {
    levels: ['normal', 'large', 'xlarge'],
    current: 0,
    set(level) {
      const html = document.documentElement;
      if (level === 'normal') html.removeAttribute('data-fontscale');
      else html.setAttribute('data-fontscale', level);
      this.current = this.levels.indexOf(level);
      try { localStorage.setItem('rsfsr-fontscale', level); } catch(e) {}
    },
    inc() {
      this.current = Math.min(this.current + 1, this.levels.length - 1);
      this.set(this.levels[this.current]);
    },
    dec() {
      this.current = Math.max(this.current - 1, 0);
      this.set(this.levels[this.current]);
    },
    reset() { this.set('normal'); this.current = 0; },
    init() {
      let s = 'normal';
      try { s = localStorage.getItem('rsfsr-fontscale') || 'normal'; } catch(e) {}
      this.set(s);
      document.querySelectorAll('[data-font-action]').forEach(b => {
        b.addEventListener('click', () => {
          const a = b.dataset.fontAction;
          if (a === 'inc') this.inc();
          else if (a === 'dec') this.dec();
          else this.reset();
        });
      });
    }
  };

  const Reveal = {
    init() {
      if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger')
          .forEach(el => el.classList.add('in'));
        return;
      }
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger')
        .forEach(el => io.observe(el));
    }
  };

  const Progress = {
    init() {
      const bar = document.querySelector('.scroll-progress');
      if (!bar) return;
      const update = () => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const p = max > 0 ? (h.scrollTop / max) * 100 : 0;
        bar.style.width = p + '%';
      };
      window.addEventListener('scroll', update, { passive: true });
      update();
    }
  };

  const NavActive = {
    init() {
      const links = Array.from(document.querySelectorAll('.topbar-nav a[href^="#"]'));
      if (!links.length) return;
      const targets = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const id = '#' + e.target.id;
            links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
          }
        });
      }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
      targets.forEach(t => io.observe(t));
    }
  };

  const Burger = {
    init() {
      const burger = document.querySelector('.tbtn-burger');
      const nav = document.querySelector('.topbar-nav');
      if (!burger || !nav) return;
      burger.addEventListener('click', () => nav.classList.toggle('open'));
      nav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') nav.classList.remove('open');
      });
    }
  };

  const Modal = {
    el: null, frame: null, title: null,
    init() {
      this.el = document.querySelector('.modal-back');
      if (!this.el) return;
      this.frame = this.el.querySelector('.modal-frame');
      this.title = this.el.querySelector('.modal-head h3');
      this.el.addEventListener('click', (e) => { if (e.target === this.el) this.close(); });
      this.el.querySelectorAll('[data-modal-close]').forEach(b => b.addEventListener('click', () => this.close()));
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.close(); });
      document.querySelectorAll('[data-open-modal]').forEach(a => {
        a.addEventListener('click', (ev) => {
          const url = a.dataset.openModal || a.getAttribute('href');
          if (!url) return;
          ev.preventDefault();
          this.open(url, a.dataset.modalTitle || a.textContent.trim());
        });
      });
      const newTab = this.el.querySelector('[data-modal-newtab]');
      if (newTab) newTab.addEventListener('click', () => {
        if (this.frame.src) window.open(this.frame.src, '_blank', 'noopener');
      });
    },
    open(url, title) {
      if (!this.el) return;
      this.title.textContent = title || '';
      this.frame.src = url;
      this.el.classList.add('open');
      document.body.style.overflow = 'hidden';
    },
    close() {
      if (!this.el) return;
      this.el.classList.remove('open');
      this.frame.src = 'about:blank';
      document.body.style.overflow = '';
    }
  };

  const Smooth = {
    init() {
      document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
          const id = a.getAttribute('href');
          if (id.length < 2) return;
          const t = document.querySelector(id);
          if (!t) return;
          e.preventDefault();
          const top = t.getBoundingClientRect().top + window.pageYOffset - 70;
          window.scrollTo({ top, behavior: 'smooth' });
          history.replaceState(null, '', id);
        });
      });
    }
  };

  function init() {
    Theme.init();
    FontScale.init();
    Reveal.init();
    Progress.init();
    NavActive.init();
    Burger.init();
    Modal.init();
    Smooth.init();
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);

  global.Theme = Theme;
  global.FontScale = FontScale;
  global.Reveal = Reveal;
  global.Modal = Modal;
})(window);
