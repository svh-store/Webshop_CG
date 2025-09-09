const assert = require('assert');
const fs = require('fs');
const path = require('path');

function paddingPercent(aspectRatio) {
  return (1 / aspectRatio) * 100;
}

// Basic aspect ratio conversions ensure proportional display
assert.strictEqual(paddingPercent(1), 100);
assert.strictEqual(paddingPercent(2), 50);
assert(Math.abs(paddingPercent(1.5) - 66.6666) < 0.0001);

// Ensure CSS tweaks remove gallery borders and tighten gaps
const css = fs.readFileSync(path.join(__dirname, '../assets/media-gallery.css'), 'utf8');
assert(css.includes('border: none'));
assert(css.includes('--media-gap: var(--space-unit)'));
assert(css.includes('max-width: 800px'));
assert(css.includes('justify-content: center'));

// Ensure product page media container has no extra margin
const prodCss = fs.readFileSync(path.join(__dirname, '../assets/product-page.css'), 'utf8');
assert(prodCss.includes('.product-main .product-media {\n  margin-top: 0;'));

console.log('media-gallery tests passed');

