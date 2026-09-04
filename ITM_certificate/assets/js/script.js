/**
 * ITM Innovation Hackathon - Certificate Showcase
 *
 * Fetches certificates from certificates.json and renders them dynamically:
 * - Preview at top (with lightbox modal)
 * - Participant name in middle
 * - Download button at bottom
 * - Live real-time search filter
 */

// Escape HTML utility to prevent XSS
function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[char] || char));
}

// Main initialization
async function initCertificates() {
  const container = document.querySelector('.certificate') || document.querySelector('.certiicate');
  if (!container) return;

  try {
    // 1. Fetch certificate manifest
    const response = await fetch('ITM_certificate/certificates/certificates.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const certificates = await response.json();

    container.innerHTML = '';
    const cardObjects = [];

    // 2. Loop through each certificate one by one
    for (const cert of certificates) {
      const card = createCertificateCard(cert);
      container.appendChild(card);

      cardObjects.push({
        element: card,
        name: cert.name.toLowerCase()
      });
    }

    // 3. Connect real-time search filter
    setupSearch(container, cardObjects);

    // 4. Connect scroll-reveal animation
    setupScrollObserver();

    // 5. Connect smooth scroll cue
    setupSmoothScroll();

  } catch (err) {
    console.error('Failed to load certificates:', err);
    container.innerHTML = `
      <div class="no-certificates-found">
        <div class="empty-state-content">
          <i class="fa-solid fa-triangle-exclamation" style="font-size: 2.5rem; color: #f59e0b; margin-bottom: 12px;"></i>
          <h3>Unable to Load Certificates</h3>
          <p>If you are opening this file locally, please run a local server (e.g. VS Code Live Server or <code>python3 -m http.server</code>) to allow loading the certificate data.</p>
        </div>
      </div>
    `;
  }
}

// Build an individual certificate card
function createCertificateCard(cert) {
  const card = document.createElement('div');
  card.className = 'certificate-card';
  card.setAttribute('data-name', cert.name.toLowerCase());

  const isPdf = cert.filename.toLowerCase().endsWith('.pdf');

  // 1. Top Preview
  const preview = document.createElement('div');
  preview.className = 'card-preview';
  preview.setAttribute('title', `Click to preview certificate for ${cert.name}`);

  if (isPdf) {
    preview.innerHTML = `
      <div class="pdf-preview-box">
        <i class="fa-solid fa-file-pdf pdf-icon"></i>
        <span class="pdf-filename">${escapeHtml(cert.filename)}</span>
      </div>
      <div class="preview-overlay">
        <i class="fa-solid fa-magnifying-glass-plus"></i> View Preview
      </div>
    `;
  } else {
    preview.innerHTML = `
      <img src="${cert.path}" alt="Certificate for ${escapeHtml(cert.name)}" loading="lazy" />
      <div class="preview-overlay">
        <i class="fa-solid fa-magnifying-glass-plus"></i> View Preview
      </div>
    `;
  }

  preview.addEventListener('click', () => openPreviewModal(cert, isPdf));

  // 2. Middle Name
  const info = document.createElement('div');
  info.className = 'card-info';
  info.innerHTML = `
    <h3 class="participant-name">${escapeHtml(cert.name)}</h3>
    <span class="cert-badge"><i class="fa-solid fa-award"></i> Certificate of Participation</span>
  `;

  // 3. Bottom Download Button
  const actions = document.createElement('div');
  actions.className = 'card-actions';
  actions.innerHTML = `
    <a href="${cert.path}" download="${cert.filename}" class="download-btn" title="Download certificate for ${escapeHtml(cert.name)}">
      <i class="fa-solid fa-download"></i> Download
    </a>
  `;

  card.appendChild(preview);
  card.appendChild(info);
  card.appendChild(actions);

  return card;
}

// Live search & filter
function setupSearch(container, cardObjects) {
  const searchInput = document.querySelector('.search_bar input');
  if (!searchInput) return;

  const searchContainer = document.querySelector('.search_bar');
  let counter = document.querySelector('.search-counter');
  if (!counter && searchContainer) {
    counter = document.createElement('p');
    counter.className = 'search-counter';
    searchContainer.appendChild(counter);
  }

  // Create empty state element
  let emptyState = document.createElement('div');
  emptyState.className = 'no-certificates-found';
  emptyState.style.display = 'none';
  container.parentElement.appendChild(emptyState);

  function filterCards(query) {
    const cleanQuery = query.trim().toLowerCase();
    let matchCount = 0;

    for (const { element, name } of cardObjects) {
      const isMatch = !cleanQuery || name.includes(cleanQuery);
      element.style.display = isMatch ? '' : 'none';
      if (isMatch) {
        matchCount++;
        if (cleanQuery) {
          element.classList.add('in-view');
        }
      }
    }

    if (counter) {
      counter.textContent = cleanQuery
        ? `Found ${matchCount} certificate${matchCount === 1 ? '' : 's'} for "${query.trim()}"`
        : `Showing all ${cardObjects.length} certificates`;
    }

    if (matchCount === 0) {
      emptyState.innerHTML = `
        <div class="empty-state-content">
          <i class="fa-regular fa-face-frown"></i>
          <h3>No Certificates Found</h3>
          <p>We couldn't find any certificate matching "<strong>${escapeHtml(query)}</strong>".</p>
          <button type="button" class="clear-search-btn">Show All Certificates</button>
        </div>
      `;
      emptyState.style.display = 'block';

      emptyState.querySelector('.clear-search-btn')?.addEventListener('click', () => {
        searchInput.value = '';
        filterCards('');
        searchInput.focus();
      });
    } else {
      emptyState.style.display = 'none';
    }
  }

  searchInput.addEventListener('input', (e) => filterCards(e.target.value));
  filterCards('');
}

// Full-screen Preview Modal
function openPreviewModal(cert, isPdf) {
  let modal = document.getElementById('cert-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'cert-modal';
    modal.className = 'cert-modal-overlay';
    document.body.appendChild(modal);
  }

  const previewBody = isPdf
    ? `<iframe src="${cert.path}" class="modal-pdf-frame" title="Certificate for ${escapeHtml(cert.name)}"></iframe>`
    : `<img src="${cert.path}" alt="Certificate for ${escapeHtml(cert.name)}" class="modal-img" />`;

  modal.innerHTML = `
    <div class="cert-modal-box">
      <div class="cert-modal-header">
        <div class="modal-title">
          <h3>${escapeHtml(cert.name)}</h3>
          <span>Certificate Preview</span>
        </div>
        <button class="cert-modal-close" aria-label="Close preview">&times;</button>
      </div>
      <div class="cert-modal-body">
        ${previewBody}
      </div>
      <div class="cert-modal-footer">
        <a href="${cert.path}" download="${cert.filename}" class="download-btn">
          <i class="fa-solid fa-download"></i> Download Certificate
        </a>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.classList.add('modal-open');

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  };

  modal.querySelector('.cert-modal-close')?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', onKeyDown);
    }
  };
  document.addEventListener('keydown', onKeyDown);
}

// Smooth scroll cues
function setupSmoothScroll() {
  const downloadBelow = document.querySelector('.download_below');
  if (downloadBelow) {
    downloadBelow.addEventListener('click', () => {
      const target = document.querySelector('.search_bar') || document.querySelector('.certificate');
      target?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const scrollTopBtn = document.querySelector('.scroll_top_btn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// Smooth scroll-reveal observer: reveals cards as user scrolls pass them
function setupScrollObserver() {
  if (!('IntersectionObserver' in window)) {
    // Fallback: show cards immediately if browser lacks IntersectionObserver
    document.querySelectorAll('.certificate-card').forEach((card) => {
      card.classList.add('in-view');
    });
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.08
  });

  document.querySelectorAll('.certificate-card').forEach((card) => {
    observer.observe(card);
  });
}

// Run on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCertificates);
} else {
  initCertificates();
}
