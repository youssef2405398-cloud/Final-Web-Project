/**
 * Events Page Enhancements
 * Handles: Client-side filtering, progressive search, pagination
 */
document.addEventListener('DOMContentLoaded', () => {
  const filterForm = document.querySelector('.filters');
  if (!filterForm) return;

  // Store original button text
  const btn = filterForm.querySelector('button');
  if (btn) btn.dataset.originalText = btn.textContent;

  // Intercept form submission for AJAX filtering
  filterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(filterForm);
    const params = new URLSearchParams(formData).toString();
    const url = `${window.location.pathname}?${params}`;

    setLoading(filterForm, true);

    try {
      const res = await fetch(url, {
        headers: { 'Accept': 'application/json' }
      });
      if (!res.ok) throw new Error('Failed to fetch events');

      const data = await res.json();
      renderEvents(data.events, data.pagination);
      window.history.pushState(null, '', url);
    } catch (err) {
      console.error(err);
      showToast('Failed to filter events. Showing all.', 'error');
      // Fallback: normal form submit
      filterForm.submit();
    } finally {
      setLoading(filterForm, false);
    }
  });

  // Pagination click handler



  // ===== Render Events Grid =====
  function renderEvents(events, pagination) {
    const grid = document.querySelector('.events-grid');
    if (!grid) return;

    grid.innerHTML = '';

    if (!events || events.length === 0) {
      grid.innerHTML = `<p class="empty-state">No events match your filters. <a href="/events">Clear filters</a></p>`;
      return;
    }

    events.forEach(event => {
      const card = document.createElement('article');
      card.className = 'event-card';
      card.innerHTML = `
      <div class="event-image">
        <img src="${event.imageUrl || '/images/default-event.jpg'}" alt="${event.title}" loading="lazy">
        <span class="badge ${event.category}">${event.category}</span>
      </div>
      <div class="event-content">
        <time class="date">📅 ${formatDate(event.date)} • ${event.time}</time>
        <h3 class="title">${event.title}</h3>
        <p class="organizer">by ${event.organizer}</p>
        <p class="location">📍 ${event.location}</p>
        <div class="stats">
          <span>👥 ${event.currentAttendees || 0}/${event.maxAttendees}</span>
          ${event.availableSeats <= 20 && event.availableSeats > 0 ? '<span class="warning">⚠️ Few seats left!</span>' : ''}
          ${event.availableSeats <= 0 ? '<span class="full">❌ Full</span>' : ''}
        </div>
        <a href="/events/${event._id}" class="btn btn-primary">View Details →</a>
      </div>
    `;
      grid.appendChild(card);
    });

    updatePagination(pagination);
  }

  function updatePagination(pagination) {
    const container = document.querySelector('.pagination');
    if (!container || !pagination) return;

    let html = '';
    if (pagination.hasPrev) {
      html += `<a href="?page=${pagination.currentPage - 1}&${new URLSearchParams(window.location.search).toString()}" class="page-link">← Prev</a>`;
    } else {
      html += `<span class="disabled">← Prev</span>`;
    }

    for (let i = 1; i <= pagination.totalPages; i++) {
      html += i === pagination.currentPage
        ? `<span class="active">${i}</span>`
        : `<a href="?page=${i}&${new URLSearchParams(window.location.search).toString()}" class="page-link">${i}</a>`;
    }

    if (pagination.hasNext) {
      html += `<a href="?page=${pagination.currentPage + 1}&${new URLSearchParams(window.location.search).toString()}" class="page-link">Next →</a>`;
    } else {
      html += `<span class="disabled">Next →</span>`;
    }

    container.innerHTML = html;
  }