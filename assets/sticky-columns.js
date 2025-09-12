(function () {
  function setStickyColumn() {
    var gallery = document.getElementById('pdpGallery');
    var info = document.getElementById('pdpInfo');

    if (!gallery || !info) return;

    gallery.classList.remove('is-sticky');
    info.classList.remove('is-sticky');

    if (gallery.offsetHeight < info.offsetHeight) {
      gallery.classList.add('is-sticky');
    } else {
      info.classList.add('is-sticky');
    }
  }

  document.addEventListener('DOMContentLoaded', setStickyColumn);
  window.addEventListener('load', setStickyColumn);
  window.addEventListener('resize', setStickyColumn);
})();
