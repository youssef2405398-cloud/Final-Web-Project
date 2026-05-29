/**
 * Authentication Page Enhancements
 * Handles: Password visibility toggle, inline validation, fetch submission
 */
document.addEventListener('DOMContentLoaded', () => {
  initPasswordToggle();
  initAuthForms();
});

// ===== Password Show/Hide =====
function initPasswordToggle() {
  document.querySelectorAll('.password-wrapper').forEach(wrapper => {
    const input = wrapper.querySelector('input[type="password"]');
    const toggle = wrapper.querySelector('.toggle-password');
    if (!input || !toggle) return;

    toggle.addEventListener('click', () => {
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      toggle.textContent = isPassword ? '🙈' : '👁️';
    });
  });
}

// ===== Form Handling =====
function initAuthForms() {
  const forms = document.querySelectorAll('.auth-form');
  forms.forEach(form => {
    const originalSubmit = form.onsubmit;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      setLoading(form, true);


    });
  });
}