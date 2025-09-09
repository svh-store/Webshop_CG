(function() {
  function init(gallery) {
    const stage = gallery.querySelector('.ag_stage');
    let currentImage = stage.querySelector('.ag_image');
    let currentVideo = stage.querySelector('.ag_video');
    const thumbs = gallery.querySelectorAll('.ag_thumb');

    function showImage(src, srcset, alt, mediaId) {
      if (currentVideo && currentVideo.parentElement) {
        currentVideo.parentElement.removeChild(currentVideo);
        currentVideo = null;
      }
      if (!currentImage) {
        currentImage = document.createElement('img');
        currentImage.className = 'ag_image';
        stage.appendChild(currentImage);
      }
      currentImage.src = src;
      if (srcset) currentImage.srcset = srcset;
      currentImage.alt = alt || '';
      if (mediaId) currentImage.setAttribute('data-media-id', mediaId);
    }

    function handleThumbClick(btn) {
      const kind = btn.dataset.kind;
      thumbs.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      if (kind === 'image') {
        showImage(btn.dataset.src, btn.dataset.srcset, btn.dataset.alt, btn.dataset.mediaId);
      } else if (kind === 'video') {
        const img = btn.querySelector('img');
        if (img && img.src) {
          showImage(img.src, '', img.alt || '', btn.dataset.mediaId);
        }
      }
    }

    thumbs.forEach(btn => {
      btn.addEventListener('click', () => handleThumbClick(btn));
      btn.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleThumbClick(btn);
        }
      });
    });

    const variantHost = document.querySelector('variant-radios, variant-selects');
    if (variantHost) {
      variantHost.addEventListener('change', () => {
        const selected = document.querySelector('[name="id"] option:checked, [name="id"][type="radio"]:checked');
        const label = selected ? selected.textContent.trim().toLowerCase() : '';
        if (!label) return;
        let match = null;
        thumbs.forEach(btn => {
          const alt = btn.querySelector('img')?.alt || '';
          if (!match && alt.toLowerCase().includes(label)) match = btn;
        });
        if (match) match.click();
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.ag').forEach(init);
  });
})();
