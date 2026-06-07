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


