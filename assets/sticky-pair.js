/**
 * Smart sticky pair for product page.
 * The shorter column (gallery or info) sticks while scrolling and
 * stops at the bottom of the taller column.
 */
(function () {
  const mq = window.matchMedia('(min-width: 990px)');
  const pair = document.getElementById('pdpPair');
  if (!pair) return;
  const galleryCard = document.getElementById('galleryCard');
  const infoCard = document.getElementById('infoCard');
  if (!galleryCard || !infoCard) return;
  const galleryCol = galleryCard.closest('.pdp-col');
  const infoCol = infoCard.closest('.pdp-col');
  const cols = [galleryCol, infoCol];
  let stickyEl = null;
  let pairHeight = 0;
  let lockPoint = 0;

  const getTopOffset = () => {
    const rootStyles = getComputedStyle(document.documentElement);
    return parseInt(rootStyles.getPropertyValue('--sticky-top')) || 0;
  };

  const cleanup = () => {
    window.removeEventListener('scroll', onScroll);
    stickyEl = null;
    cols.forEach((col) => (col.style.height = ''));
    [galleryCard, infoCard].forEach((el) => {
      el.classList.remove('pdp-sticky', 'pdp-locked');
      el.style.top = '';
      el.style.bottom = '';
      el.style.position = '';
    });
  };

  const calculate = () => {
    cols.forEach((col) => (col.style.height = ''));
    [galleryCard, infoCard].forEach((el) => {
      el.classList.remove('pdp-sticky', 'pdp-locked');
      el.style.top = '';
      el.style.bottom = '';
      el.style.position = '';
    });
    pairHeight = Math.max(galleryCard.offsetHeight, infoCard.offsetHeight);
    cols.forEach((col) => (col.style.height = `${pairHeight}px`));
    stickyEl = galleryCard.offsetHeight < infoCard.offsetHeight ? galleryCard : infoCard;
    stickyEl.classList.add('pdp-sticky');
    const topOffset = getTopOffset();
    const pairRect = pair.getBoundingClientRect();
    const pairTop = pairRect.top + window.scrollY;
    lockPoint = pairTop + pairHeight - stickyEl.offsetHeight - topOffset;
    onScroll();
  };

  const onScroll = () => {
    if (!stickyEl) return;
    if (window.scrollY >= lockPoint) {
      stickyEl.classList.add('pdp-locked');
    } else {
      stickyEl.classList.remove('pdp-locked');
    }
  };

  const enable = () => {
    calculate();
    window.addEventListener('scroll', onScroll);
  };

  const check = () => {
    if (mq.matches) {
      enable();
    } else {
      cleanup();
    }
  };

  mq.addEventListener('change', check);
  window.addEventListener('resize', () => {
    if (mq.matches) calculate();
  });
  const ro = new ResizeObserver(() => {
    if (mq.matches) calculate();
  });
  ro.observe(galleryCard);
  ro.observe(infoCard);
  check();
})();
