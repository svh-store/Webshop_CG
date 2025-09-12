document.addEventListener('DOMContentLoaded', () => {
  const apply = () => {
    const top = getComputedStyle(document.documentElement).getPropertyValue('--header-end-padded');
    document.querySelectorAll('#pdpPair > .pdp-sticky').forEach((el) => {
      el.style.top = top;
    });
  };
  apply();
  window.addEventListener('resize', apply);
});
