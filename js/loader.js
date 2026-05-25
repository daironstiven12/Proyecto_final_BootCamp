/* ============================================
   LOADER.JS - Full screen loader controller
   ============================================ */

const PageLoader = {
  overlay: null,
  minLoadTime: 800,

  init: function () {
    this.createLoader();
    window.addEventListener('load', () => this.hideLoader());
  },

  createLoader: function () {
    this.overlay = document.createElement('div');
    this.overlay.className = 'loader-overlay';
    this.overlay.innerHTML = `
      <div class="loader-container">
        <div class="loader-ring"></div>
        <div class="loader-ring"></div>
        <div class="loader-ring"></div>
        <div class="loader-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
        </div>
      </div>
      <div class="loader-text">Preparando tu experiencia educativa...</div>
      <div class="loader-progress">
        <div class="loader-progress-bar"></div>
      </div>
    `;
    document.body.appendChild(this.overlay);
  },

  hideLoader: function () {
    const startTime = performance.now();
    const elapsed = startTime - window.loadStartTime;
    const remaining = Math.max(0, this.minLoadTime - elapsed);

    setTimeout(() => {
      this.overlay.classList.add('hidden');
      document.body.style.overflow = '';
      setTimeout(() => {
        if (this.overlay && this.overlay.parentNode) {
          this.overlay.parentNode.removeChild(this.overlay);
        }
      }, 600);
    }, remaining);
  }
};

window.loadStartTime = performance.now();

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.overflow = 'hidden';
  PageLoader.init();
});
