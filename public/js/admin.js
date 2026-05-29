
document.addEventListener('DOMContentLoaded', () => {
  initAdminActions();
});

function initAdminActions() {
  const adminGrid = document.querySelector('.admin-grid');
  if (!adminGrid) return;

  adminGrid.addEventListener('submit', async (e) => {
    if (!e.target.classList.contains('admin-action-form')) return;
    e.preventDefault();

    const form = e.target;
    const action = form.action.includes('approve') ? 'approve' : 'reject';
    const card = form.closest('.event-card');

    if (!confirm(`Are you sure you want to ${action} this event?`)) return;

    setLoading(form, true);

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form))
      });



    });
}