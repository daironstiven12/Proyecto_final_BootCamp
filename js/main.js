/* ============================================
   MAIN.JS - Core application logic
   Human-Centered Engineering: user advocacy,
   accessibility, performance, scalability
   ============================================ */

const App = {
  init: function () {
    this.loadComponents();
    this.initTheme();
    this.initNavigation();
    this.initProgress();
    this.initAnimations();
  },

  /* ==========================================
     COMPONENT LOADING
     ========================================== */
  getPagePrefix: function () {
    return window.location.pathname.includes('/pages/') ? '../' : '';
  },

  loadComponents: function () {
    const p = this.getPagePrefix();
    this.loadComponent('navbar-placeholder', p + 'components/navbar.html');
    this.loadComponent('footer-placeholder', p + 'components/footer.html');
  },

  loadComponent: function (id, url) {
    const placeholder = document.getElementById(id);
    if (!placeholder) return;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load: ' + url);
        return res.text();
      })
      .then(html => {
        placeholder.outerHTML = html;
        if (id === 'navbar-placeholder') this.onNavbarLoaded();
        if (id === 'footer-placeholder') this.onFooterLoaded();
      })
      .catch(() => {
        if (id === 'navbar-placeholder') this.renderNavbarFallback(placeholder);
        if (id === 'footer-placeholder') this.renderFooterFallback(placeholder);
      });
  },

  /* ==========================================
     NAVBAR (inline fallback)
     ========================================== */
  renderNavbarFallback: function (placeholder) {
    const p = this.getPagePrefix();
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const isActive = (page) => currentPage === page || (!currentPage || currentPage === 'index.html') && page === 'index.html' ? ' aria-current="page"' : '';

    placeholder.outerHTML = `
      <nav class="navbar" id="main-navbar" role="navigation" aria-label="Navegacion principal">
        <div class="container">
          <a href="${p}index.html" class="navbar-logo" aria-label="Ir al inicio">
            <img class="navbar-logo-img" src="${p}assets/images/Logo_s.png" alt="StudyBuddy logo">
          </a>
          <div class="navbar-links" id="nav-links" role="menubar">
            <a href="${p}index.html" role="menuitem"${isActive('index.html')}>Inicio</a>
            <a href="${p}pages/matematicas.html" role="menuitem"${isActive('matematicas.html')}>Matematicas</a>
            <a href="${p}pages/ciencias.html" role="menuitem"${isActive('ciencias.html')}>Ciencias</a>
            <a href="${p}pages/etica.html" role="menuitem"${isActive('etica.html')}>Ética</a>
            <a href="${p}pages/ingles.html" role="menuitem"${isActive('ingles.html')}>Ingles</a>
            <a href="${p}pages/historia.html" role="menuitem"${isActive('historia.html')}>Historia</a>
            <a href="${p}pages/tecnologia.html" role="menuitem"${isActive('tecnologia.html')}>Tecnologia</a>
            <a href="${p}pages/juegos.html" role="menuitem"${isActive('juegos.html')}>Juegos</a>
            <a href="${p}pages/practicas.html" role="menuitem"${isActive('practicas.html')}>Practicas</a>
          </div>
          <div class="navbar-actions">
            <button class="theme-toggle" id="theme-toggle" aria-label="Cambiar modo oscuro">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" id="theme-icon" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            </button>
            <button class="menu-toggle" id="menu-toggle" aria-label="Abrir menu de navegacion" aria-expanded="false">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>
    `;
    this.onNavbarLoaded();
  },

  /* ==========================================
     FOOTER (inline fallback)
     ========================================== */
  renderFooterFallback: function (placeholder) {
    const p = this.getPagePrefix();
    placeholder.outerHTML = `
      <footer class="footer" role="contentinfo">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <div class="footer-logo">
                <img class="footer-logo-img" src="${p}assets/images/Logo_s.png" alt="StudyBuddy">
              </div>
              <p>Plataforma educativa interactiva para estudiantes.</p>
            </div>
            <div>
              <h4>Materias</h4>
              <div class="footer-links">
                <a href="${p}pages/matematicas.html">Matematicas</a>
                <a href="${p}pages/ciencias.html">Ciencias</a>
                <a href="${p}pages/etica.html">Ética</a>
                <a href="${p}pages/ingles.html">Ingles</a>
                <a href="${p}pages/historia.html">Historia</a>
                <a href="${p}pages/español.html">Tecnologia</a>
              </div>
            </div>
            <div>
              <h4>Actividades</h4>
              <div class="footer-links">
                <a href="${p}pages/juegos.html">Juegos educativos</a>
                <a href="${p}pages/practicas.html">Practicas</a>
                <a href="${p}index.html#subjects">Materias</a>
              </div>
            </div>
            <div>
              <h4>Plataforma</h4>
              <div class="footer-links">
                <a href="${p}index.html">Inicio</a>
                <a href="${p}index.html#features">Caracteristicas</a>
                <a href="#!" id="footer-theme-toggle">Modo oscuro</a>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} StudyBuddy. Plataforma educativa.</p>
            <div class="footer-socials">
              <a href="#!" aria-label="Twitter" aria-disabled="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
              </a>
              <a href="#!" aria-label="GitHub" aria-disabled="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    `;
    this.onFooterLoaded();
  },

  /* ==========================================
     NAVBAR EVENTS
     ========================================== */
  onNavbarLoaded: function () {
    this.fixNavbarPaths();
    this.initScrollEffect();
    this.initMenuToggle();
    this.initThemeToggle();
    this.highlightActiveLink();
  },

  fixNavbarPaths: function () {
    const logo = document.querySelector('.navbar-logo-img');
    if (logo) {
      const p = this.getPagePrefix();
      logo.setAttribute('src', p + 'assets/images/Logo_s.png');
      const link = logo.closest('a');
      if (link) link.setAttribute('href', p + 'index.html');
    }
  },

  onFooterLoaded: function () {
    const toggle = document.getElementById('footer-theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleTheme();
      });
    }
  },

  /* ==========================================
     SCROLL EFFECT
     ========================================== */
  initScrollEffect: function () {
    const navbar = document.getElementById('main-navbar');
    if (!navbar) return;
    let ticking = false;

    const update = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  },

  /* ==========================================
     MOBILE MENU
     ========================================== */
  initMenuToggle: function () {
    const toggle = document.getElementById('menu-toggle');
    const links = document.getElementById('nav-links');
    if (!toggle || !links) return;

    const openMenu = () => {
      toggle.classList.add('active');
      links.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Cerrar menu de navegacion');
    };

    const closeMenu = () => {
      toggle.classList.remove('active');
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu de navegacion');
    };

    toggle.addEventListener('click', () => {
      const isOpen = links.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });

    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !links.contains(e.target) && links.classList.contains('open')) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        closeMenu();
        toggle.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 767 && links.classList.contains('open')) {
        closeMenu();
      }
    });
  },

  /* ==========================================
     THEME SYSTEM
     ========================================== */
  initTheme: function () {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else if (saved === 'light') {
      document.documentElement.removeAttribute('data-theme');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }

    this.updateThemeIcon();
  },

  initThemeToggle: function () {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => this.toggleTheme());
  },

  toggleTheme: function () {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
    this.updateThemeIcon();
  },

  updateThemeIcon: function () {
    const icon = document.getElementById('theme-icon');
    if (!icon) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    icon.innerHTML = isDark
      ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
      : '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
  },

  /* ==========================================
     NAVIGATION
     ========================================== */
  initNavigation: function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const id = anchor.getAttribute('href');
        if (id && id !== '#!') {
          const target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            target.focus({ preventScroll: true });
          }
        }
      });
    });
  },

  highlightActiveLink: function () {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar-links a').forEach(link => {
      const href = link.getAttribute('href').split('/').pop();
      if (href === currentPath) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  },

  /* ==========================================
     PROGRESS SYSTEM
     ========================================== */
  initProgress: function () {
    this.renderProgress();
    document.addEventListener('progressUpdated', () => this.renderProgress());
  },

  getProgress: function () {
    try {
      const data = localStorage.getItem('studyProgress');
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  renderProgress: function () {
    const container = document.getElementById('progress-section');
    if (!container) return;

    const progress = this.getProgress();
    const subjects = {
      matematicas: { label: 'Matematicas', color: 'math' },
      ciencias: { label: 'Ciencias', color: 'science' },
      etica: { label: 'Ética', color: 'ethics' },
      ingles: { label: 'Ingles', color: 'english' },
      historia: { label: 'Historia', color: 'history' },
      tecnologia: { label: 'Tecnologia', color: 'tech' }
    };

    const values = Object.keys(subjects).map(key => progress[key] || 0);
    const total = values.reduce((a, b) => a + b, 0);
    const avg = Math.round(values.length > 0 ? total / values.length : 0);

    container.setAttribute('role', 'region');
    container.setAttribute('aria-label', 'Progreso del estudiante');

    container.innerHTML = `
      <div class="progress-header">
        <h3>Tu Progreso</h3>
        <span class="progress-percent">${avg}% completo</span>
      </div>
      <div class="progress-bar" role="progressbar" aria-valuenow="${avg}" aria-valuemin="0" aria-valuemax="100" aria-label="${avg}% completo">
        <div class="progress-fill" style="width: ${avg}%"></div>
      </div>
      <div class="progress-subjects">
        ${Object.entries(subjects).map(([key, subj]) => `
          <div class="progress-subject">
            <div class="progress-subject-name">${subj.label}</div>
            <div class="progress-subject-bar">
              <div class="progress-subject-fill ${subj.color}" style="width: ${progress[key] || 0}%"></div>
            </div>
            <div class="progress-subject-value">${progress[key] || 0}%</div>
          </div>
        `).join('')}
      </div>
    `;
  },

  /* ==========================================
     ANIMATIONS
     ========================================== */
  initAnimations: function () {
    if (typeof Animations !== 'undefined') {
      Animations.init();
    }
  }
};

/* ---- Initialize on DOM ready ---- */
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
