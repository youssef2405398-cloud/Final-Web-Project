/**
 * Global UI Scripts
 * Handles: Theme toggle, mobile menu, toast notifications, utilities
 */
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  hideToastAutomatically();
  initSmoothScroll();
});

// ===== Theme Toggle =====
function initThemeToggle() {
  const saved = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  } else if (prefersLight) {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  // Optional: Add button with id="theme-toggle" to your navbar
  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }
}

// ===== Mobile Menu =====
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  const authBtns = document.querySelector('.auth-buttons');

  if (!toggle || !navLinks) return;


}

// ===== Auto-hide Toast =====
function hideToastAutomatically() {
  const toast = document.getElementById('toast');
  if (toast && toast.classList.contains('show')) {
    setTimeout(() => toast.classList.remove('show'), 4000);
  }
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ===== Utilities =====
window.showToast = (message, type = 'success') => {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  setTimeout(() => toast.classList.remove('show'), 4000);
};

window.formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });
};

window.setLoading = (form, loading = true) => {
  const btn = form.querySelector('button[type="submit"]');
  if (!btn) return;
  btn.disabled = loading;
  btn.textContent = loading ? 'Processing...' : (btn.dataset.originalText || btn.textContent);
  if (!btn.dataset.originalText) btn.dataset.originalText = btn.textContent;
};