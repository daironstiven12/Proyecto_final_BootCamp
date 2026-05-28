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
    this.initMascotObserver();
    this.createBackgroundChars();

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
            if (entry.target.classList.contains('stagger-children')) {
              entry.target.classList.add('visible');
            } else {
              const delay = entry.target.style.getPropertyValue('--reveal-delay');
              if (delay) {
                setTimeout(() => {
                  entry.target.classList.add('visible');
                }, parseFloat(delay) * 1000 || 0);
              } else {
                entry.target.classList.add('visible');
              }
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
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

  initMascotObserver: function () {
    const mascot = document.getElementById('edu-mascot');
    if (!mascot) return;
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      const diff = Math.abs(window.scrollY - lastScrollY);
      if (diff > 150 && mascot.classList.contains('idle')) {
        mascot.classList.remove('idle');
        mascot.classList.add('surprise');
        setTimeout(() => {
          mascot.classList.remove('surprise');
          mascot.classList.add('idle');
        }, 1000);
        lastScrollY = window.scrollY;
      }
    }, { passive: true });
  },

  /* ==========================================
     BACKGROUND FLOATING CHARACTERS
     ========================================== */
  createBackgroundChars: function () {
    if (document.getElementById('bg-characters')) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const container = document.createElement('div');
    container.id = 'bg-characters';
    container.className = 'bg-characters';
    container.setAttribute('aria-hidden', 'true');

    const charSvgs = [
      '<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="var(--subject-math)" opacity="0.5"/><circle cx="15" cy="16" r="2" fill="white"/><circle cx="25" cy="16" r="2" fill="white"/><path d="M14 24 Q20 30 26 24" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>',
      '<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="var(--subject-science)" opacity="0.5"/><circle cx="15" cy="15" r="2" fill="white"/><circle cx="25" cy="15" r="2" fill="white"/><path d="M20 22 L20 28" stroke="white" stroke-width="1.5" stroke-linecap="round"/><path d="M17 25 L23 25" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>',
      '<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="var(--subject-english)" opacity="0.5"/><circle cx="14" cy="15" r="2.5" fill="white"/><circle cx="26" cy="15" r="2.5" fill="white"/><path d="M13 21 Q20 30 27 21" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>',
      '<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="var(--subject-history)" opacity="0.5"/><rect x="14" y="12" width="12" height="14" rx="2" fill="white" opacity="0.6"/><rect x="16" y="14" width="8" height="2" fill="var(--subject-history)"/><rect x="16" y="18" width="8" height="2" fill="var(--subject-history)"/><rect x="16" y="22" width="5" height="2" fill="var(--subject-history)"/></svg>',
      '<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="var(--subject-ethics)" opacity="0.5"/><circle cx="20" cy="16" r="4" fill="white" opacity="0.6"/><path d="M14 28 Q20 22 26 28" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>',
      '<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="var(--subject-tech)" opacity="0.5"/><rect x="15" y="14" width="10" height="12" rx="1" fill="white" opacity="0.5"/><circle cx="20" cy="20" r="3" fill="white"/></svg>',
      '<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="var(--accent-primary)" opacity="0.3"/><path d="M14 20 L20 14 L26 20 L20 26Z" fill="white" opacity="0.4"/><circle cx="20" cy="20" r="4" fill="white" opacity="0.6"/></svg>'
    ];

    const positions = [
      { top: '10%', left: '5%' }, { top: '15%', right: '10%' },
      { top: '30%', left: '15%' }, { top: '45%', right: '8%' },
      { top: '55%', left: '3%' }, { top: '70%', right: '15%' },
      { top: '85%', left: '10%' }, { top: '40%', left: '80%' },
      { top: '20%', left: '50%' }, { top: '75%', left: '40%' },
      { top: '60%', left: '70%' }, { top: '5%', left: '85%' }
    ];

    const count = Math.min(positions.length, Math.floor(window.innerWidth / 120));

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'bg-char';
      const pos = positions[i % positions.length];
      el.style.cssText = `top:${pos.top};${pos.left ? 'left:'+pos.left : 'right:'+pos.right};width:${30 + Math.random() * 40}px;height:${30 + Math.random() * 40}px;--float-duration:${18 + Math.random() * 20}s;--float-delay:${Math.random() * -20}s`;
      el.innerHTML = charSvgs[i % charSvgs.length];
      container.appendChild(el);
    }

    document.body.appendChild(container);
  },

  refreshScrollReveal: function () {
    this.initScrollReveal();
  }
};
