/**
 * Create Event Page Enhancements
 * Handles: Date validation, character counters, image preview, form submission
 */
document.addEventListener('DOMContentLoaded', () => {
  initEventForm();
});

function initEventForm() {
  const form = document.querySelector('.event-form');
  if (!form) return;

  const titleInput = form.querySelector('#title');
  const dateInput = form.querySelector('#date');
  const timeInput = form.querySelector('#time');
  const descInput = form.querySelector('#description');
  const imgInput = form.querySelector('#imageUrl');
  const imgPreview = document.getElementById('image-preview');

  // Set min date to today
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // Character counter for description


  // Form validation & submission
  form.addEventListener('submit', (e) => {
    const date = new Date(dateInput.value);
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (date < now) {
      e.preventDefault();
      showToast('Event date cannot be in the past', 'error');
      dateInput.focus();
      return;
    }

    setLoading(form, true);
    // Allow default POST submission to handle server validation & redirects
  });
}