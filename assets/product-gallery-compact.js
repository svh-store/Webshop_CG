(function () {
  const galleries = document.querySelectorAll('.pgc');
  if (!galleries.length) return;

  galleries.forEach((g) => {
    const stageImg = g.querySelector('.pgc__image');
    const thumbs = g.querySelectorAll('.pgc__thumb');

    thumbs.forEach((btn) => {
      btn.addEventListener('click', () => {
        thumbs.forEach((b) => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        const src = btn.getAttribute('data-media-src');
        const srcset = btn.getAttribute('data-media-srcset');
        const alt = btn.getAttribute('data-media-alt') || '';

        stageImg.src = src;
        stageImg.srcset = srcset;
        stageImg.alt = alt;
        stageImg.setAttribute('data-media-id', btn.getAttribute('data-media-id'));
      });
    });

    // Variantenwechsel → Featured-Media anzeigen
    document.addEventListener('variant:change', (e) => {
      const variant = e.detail && e.detail.variant;
      if (!variant || !variant.featured_media) return;
      const targetId = String(variant.featured_media.id);
      const targetThumb = g.querySelector(`.pgc__thumb[data-media-id="${targetId}"]`);
      if (targetThumb) targetThumb.click();
    });
  });
})();
