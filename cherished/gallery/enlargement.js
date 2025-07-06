
  document.addEventListener('DOMContentLoaded', function () {
    const modal = document.createElement('div');
    modal.id = 'image-modal';
    modal.innerHTML = `
      <div id="image-modal-overlay"></div>
      <img id="image-modal-content" src="" alt="Full-size image">
    `;
    document.body.appendChild(modal);

    const modalOverlay = document.getElementById('image-modal-overlay');
    const modalImage = document.getElementById('image-modal-content');

    document.querySelectorAll('.gallery_image').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        modalImage.src = img.src;
        modal.classList.add('active');
      });
    });

    modalOverlay.addEventListener('click', () => {
      modal.classList.remove('active');
      modalImage.src = '';
    });
  });

