document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('pdpGallery');
  const info = document.getElementById('pdpInfo');
  if (!gallery || !info) return;

  function updateSticky() {
    gallery.classList.remove('is-sticky');
    info.classList.remove('is-sticky');

    if (window.innerWidth < 990) return;

    const galleryHeight = gallery.offsetHeight;
    const infoHeight = info.offsetHeight;

    if (galleryHeight <= infoHeight) {
      gallery.classList.add('is-sticky');
    } else {
      info.classList.add('is-sticky');
    }
  }

  window.addEventListener('load', updateSticky);
  window.addEventListener('resize', updateSticky);
  updateSticky();
});
