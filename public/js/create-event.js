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
  if (descInput) {
    const counter = document.createElement('small');
    counter.className = 'char-counter';
    descInput.parentNode.appendChild(counter);
    
    descInput.addEventListener('input', () => {
      counter.textContent = `${descInput.value.length}/2000 characters`;
      counter.style.color = descInput.value.length > 1900 ? 'var(--warning)' : 'var(--text-secondary)';
    });
    descInput.dispatchEvent(new Event('input'));
  }

  // Image URL preview
  if (imgInput && imgPreview) {
    let debounce;
    imgInput.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        const url = imgInput.value.trim();
        if (url && url.startsWith('http')) {
          imgPreview.src = url;
          imgPreview.style.display = 'block';
          imgPreview.onerror = () => {
            imgPreview.style.display = 'none';
            showToast('Invalid image URL', 'error');
          };
        } else {
          imgPreview.style.display = 'none';
        }
      }, 500);
    });
  }

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