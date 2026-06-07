
function toggleSection(header) {
  const wrap = header.closest('.toggle-wrap');
  if (!wrap) return;

  let body = null;
  for (const child of wrap.children) {
    if (child.classList && child.classList.contains('toggle-body')) {
      body = child;
      break;
    }
  }
  if (!body) return;

  const arrow = header.querySelector('.toggle-arrow');
  const willOpen = !body.classList.contains('open') && body.style.display !== 'block';

  body.classList.toggle('open', willOpen);
  body.style.display = willOpen ? 'block' : 'none';

  if (arrow) {
    arrow.classList.toggle('open', willOpen);
    arrow.textContent = willOpen ? '▲' : '▼';
  }
}

function initToggleSections() {
  document.querySelectorAll('.toggle-wrap').forEach((wrap) => {
    const header = wrap.querySelector('.toggle-header');
    const body = wrap.querySelector('.toggle-body');
    const arrow = wrap.querySelector('.toggle-arrow');
    if (!header || !body) return;

    header.setAttribute('role', 'button');
    header.setAttribute('tabindex', '0');

    const isOpen = body.classList.contains('open');
    body.style.display = isOpen ? 'block' : 'none';
    if (arrow) {
      arrow.classList.toggle('open', isOpen);
      arrow.textContent = isOpen ? '▲' : '▼';
    }

    header.onclick = function () { toggleSection(this); };
    header.onkeydown = function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleSection(this);
      }
    };
  });
}

function navTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.addEventListener('DOMContentLoaded', initToggleSections);

// 사이드바 active 상태
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.section, [id]');
  let current = '';
  sections.forEach(s => {
    if (s.getBoundingClientRect().top <= 80) current = s.id;
  });
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.remove('active');
    if (n.dataset.target === current) n.classList.add('active');
  });
});


function openImageModal(src, alt) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('imageModalImg');
  if (!modal || !modalImg) return;
  modalImg.src = src;
  modalImg.alt = alt || '확대 이미지';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  const closeBtn = modal.querySelector('.image-modal-close');
  if (closeBtn) closeBtn.focus();
}

function closeImageModal() {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('imageModalImg');
  if (!modal || !modalImg) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  modalImg.removeAttribute('src');
}

function handleProfileImageKey(event, img) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openImageModal(img.src, img.alt);
  }
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') closeImageModal();
});


function handleModalImageKey(event, img) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openImageModal(img.src, img.alt);
  }
}

function initBodyImageModal() {
  document.querySelectorAll('main img:not(.profile-photo)').forEach((img) => {
    if (!img.src) return;
    img.classList.add('modal-zoomable-img');
    img.setAttribute('role', 'button');
    img.setAttribute('tabindex', '0');
    img.setAttribute('title', '이미지 크게 보기');
    img.addEventListener('click', () => openImageModal(img.src, img.alt || '확대 이미지'));
    img.addEventListener('keydown', (event) => handleModalImageKey(event, img));
  });
}

document.addEventListener('DOMContentLoaded', initBodyImageModal);


