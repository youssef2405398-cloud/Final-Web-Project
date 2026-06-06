/**
 * Admin Dashboard Enhancements
 * Handles: Approve/reject actions, confirm dialogs, dynamic UI updates
 */
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

      if (res.redirected) {
        showToast(`Event ${action}d successfully!`, action === 'approve' ? 'success' : 'info');
        // Remove card from DOM with animation
        card.style.transition = 'all 0.3s ease';
        card.style.opacity = '0';
        card.style.transform = 'translateX(-20px)';
        setTimeout(() => card.remove(), 300);
        
        // Update pending count if visible
        const countEl = document.querySelector('.pending-count');
        if (countEl) {
          const current = parseInt(countEl.textContent) || 0;
          countEl.textContent = Math.max(0, current - 1);
        }
      } else {
        const html = await res.text();
        document.open(); document.write(html); document.close();
      }
    } catch (err) {
      showToast('Action failed. Check console.', 'error');
      console.error(err);
    } finally {
      setLoading(form, false);
    }
  });
}