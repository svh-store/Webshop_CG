 document.addEventListener('DOMContentLoaded', () => {
   const header = document.querySelector('header');
   const update = () => {
     const pad = getComputedStyle(document.documentElement).getPropertyValue('--header-end-padded');
     const top = pad || (header ? `${header.getBoundingClientRect().bottom}px` : '0px');
     document.documentElement.style.setProperty('--pdp-sticky-top', top.trim());
   };
   update();
   window.addEventListener('resize', update, { passive: true });
 });
