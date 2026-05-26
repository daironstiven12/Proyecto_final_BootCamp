/* ============================================
   ANIMATIONS.JS - Particle background, scroll
   animations, and interactive effects
   Human-Centered Engineering: purposeful motion
   ============================================ */

const Animations = {
  particles: [],
  canvas: null,
  ctx: null,
  animationId: null,
  isInitialized: false,
  isVisible: true,

  init: function () {
    if (this.isInitialized) return;
    this.isInitialized = true;

    this.createParticlesCanvas();
    this.initScrollReveal();
    this.initRippleButtons();
    this.initVisibilityHandler();

    window.addEventListener('resize', () => this.resizeCanvas(), { passive: true });
  },

  /* ==========================================
     PARTICLES
     ========================================== */
  createParticlesCanvas: function () {
    if (document.getElementById('particles-canvas')) return;

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'particles-canvas';
    this.canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    this.createParticles();
    this.animateParticles();
  },

  resizeCanvas: function () {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },

  createParticles: function () {
    this.particles = [];
    const count = Math.min(Math.floor(window.innerWidth * 0.04), 35);

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.3 + 0.05
      });
    }
  },

  animateParticles: function () {
    if (!this.ctx || !this.canvas || !this.isVisible) {
      this.animationId = requestAnimationFrame(() => this.animateParticles());
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const color = isDark ? '255, 255, 255' : '99, 102, 241';

    this.particles.forEach((p, i) => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
      this.ctx.fill();

      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = p.x - this.particles[j].x;
        const dy = p.y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(${color}, ${0.04 * (1 - dist / 150)})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    });

    this.animationId = requestAnimationFrame(() => this.animateParticles());
  },

  /* Stop particles when tab is hidden (performance) */
  initVisibilityHandler: function () {
    document.addEventListener('visibilitychange', () => {
      this.isVisible = !document.hidden;
      if (document.hidden && this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
      if (!document.hidden && !this.animationId) {
        this.animateParticles();
      }
    });
  },

  /* ==========================================
     SCROLL REVEAL
     ========================================== */
  initScrollReveal: function () {
    const revealElements = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children'
    );

    if (revealElements.length === 0) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      revealElements.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));
  },

  /* ==========================================
     RIPPLE BUTTONS
     ========================================== */
  initRippleButtons: function () {
    document.querySelectorAll('.btn:not(.ripple)').forEach((btn) => {
      btn.classList.add('ripple');
    });
  },

  refreshScrollReveal: function () {
    this.initScrollReveal();
  }
};
