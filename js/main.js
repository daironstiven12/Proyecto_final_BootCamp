/* ============================================
   MAIN.JS - Core application logic
   Navigation, dark mode, components, progress
   ============================================ */

const App = {
  init: function () {
    this.loadComponents();
    this.initTheme();
    this.initNavigation();
    this.initProgress();
    this.initAnimations();
  },

  /* ---- Load shared components ---- */
  loadComponents: function () {
    this.loadComponent('navbar-placeholder', 'components/navbar.html');
    this.loadComponent('footer-placeholder', 'components/footer.html');
  },

  loadComponent: function (id, url) {
    const placeholder = document.getElementById(id);
    if (!placeholder) return;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load component');
        return res.text();
      })
      .then(html => {
        placeholder.outerHTML = html;
        if (id === 'navbar-placeholder') {
          this.onNavbarLoaded();
        }
        if (id === 'footer-placeholder') {
          this.onFooterLoaded();
        }
      })
      .catch(() => {
        /* Fallback: render inline component */
        if (id === 'navbar-placeholder') {
          this.renderNavbarFallback(placeholder);
        }
        if (id === 'footer-placeholder') {
          this.renderFooterFallback(placeholder);
        }
      });
  },

  /* ---- Navbar fallback (inline) ---- */
  renderNavbarFallback: function (placeholder) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const isActive = (page) => {
      return currentPage === page || (page === 'index.html' && currentPage === '') ? 'active' : '';
    };

    placeholder.outerHTML = `
      <nav class="navbar" id="main-navbar">
        <div class="container">
          <a href="index.html" class="navbar-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
            <span>StudyBuddy</span>
          </a>
          <div class="navbar-links" id="nav-links">
            <a href="index.html" class="${isActive('index.html')}">Inicio</a>
            <a href="pages/matematicas.html" class="${isActive('matematicas.html')}">Matematicas</a>
            <a href="pages/ciencias.html" class="${isActive('ciencias.html')}">Ciencias</a>
            <a href="pages/ingles.html" class="${isActive('ingles.html')}">Ingles</a>
            <a href="pages/historia.html" class="${isActive('historia.html')}">Historia</a>
            <a href="pages/tecnologia.html" class="${isActive('tecnologia.html')}">Tecnologia</a>
            <a href="pages/juegos.html" class="${isActive('juegos.html')}">Juegos</a>
            <a href="pages/practicas.html" class="${isActive('practicas.html')}">Practicas</a>
          </div>
          <div class="navbar-actions">
            <button class="theme-toggle" id="theme-toggle" aria-label="Cambiar modo oscuro">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" id="theme-icon">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            </button>
            <button class="menu-toggle" id="menu-toggle" aria-label="Menu de navegacion">
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

  renderFooterFallback: function (placeholder) {
    placeholder.outerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <div class="footer-logo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
                <span>StudyBuddy</span>
              </div>
              <p>Plataforma educativa interactiva para estudiantes. Aprende, practica y diviertete mientras estudias.</p>
            </div>
            <div>
              <h4>Materias</h4>
              <div class="footer-links">
                <a href="pages/matematicas.html">Matematicas</a>
                <a href="pages/ciencias.html">Ciencias</a>
                <a href="pages/ingles.html">Ingles</a>
                <a href="pages/historia.html">Historia</a>
                <a href="pages/tecnologia.html">Tecnologia</a>
              </div>
            </div>
            <div>
              <h4>Actividades</h4>
              <div class="footer-links">
                <a href="pages/juegos.html">Juegos educativos</a>
                <a href="pages/practicas.html">Practicas</a>
                <a href="index.html#subjects">Materias</a>
              </div>
            </div>
            <div>
              <h4>Plataforma</h4>
              <div class="footer-links">
                <a href="index.html">Inicio</a>
                <a href="index.html#features">Caracteristicas</a>
                <a href="#!" id="footer-theme-toggle">Modo oscuro</a>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} StudyBuddy. Plataforma educativa.</p>
            <div class="footer-socials">
              <a href="#!" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
              </a>
              <a href="#!" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    `;
    this.onFooterLoaded();
  },

  /* ---- Navbar events ---- */
  onNavbarLoaded: function () {
    this.initScrollEffect();
    this.initMenuToggle();
    this.initThemeToggle();
    this.highlightActiveLink();
  },

  onFooterLoaded: function () {
    const footerThemeToggle = document.getElementById('footer-theme-toggle');
    if (footerThemeToggle) {
      footerThemeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleTheme();
      });
    }
  },

  /* ---- Scroll effect ---- */
  initScrollEffect: function () {
    const navbar = document.getElementById('main-navbar');
    if (!navbar) return;

    const checkScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    };

    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
  },

  /* ---- Mobile menu toggle ---- */
  initMenuToggle: function () {
    const toggle = document.getElementById('menu-toggle');
    const links = document.getElementById('nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      links.classList.toggle('open');
    });

    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        links.classList.remove('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !links.contains(e.target)) {
        toggle.classList.remove('active');
        links.classList.remove('open');
      }
    });
  },

  /* ---- Theme system ---- */
  initTheme: function () {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else if (saved === 'light') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      /* System preference */
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    }
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
  },

  /* ---- Navigation helpers ---- */
  initNavigation: function () {
    /* Smooth scroll for anchor links */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      }
    });
  },

  /* ---- Progress system ---- */
  initProgress: function () {
    this.renderProgress();
    document.addEventListener('progressUpdated', () => this.renderProgress());
  },

  getProgress: function () {
    try {
      return JSON.parse(localStorage.getItem('studyProgress') || '{}');
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
      ingles: { label: 'Ingles', color: 'english' },
      historia: { label: 'Historia', color: 'history' },
      tecnologia: { label: 'Tecnologia', color: 'tech' }
    };

    const values = Object.keys(subjects).map(key => progress[key] || 0);
    const total = values.reduce((a, b) => a + b, 0);
    const avg = Math.round(total / values.length);

    container.innerHTML = `
      <div class="progress-header">
        <h3>Tu Progreso</h3>
        <span class="progress-percent">${avg}% completo</span>
      </div>
      <div class="progress-bar">
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

  /* ---- Animations trigger ---- */
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
