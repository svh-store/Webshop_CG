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

// Ensure gallery styles are full width without extra spacing
const galleryCss = fs.readFileSync(path.join(__dirname, '..', 'assets', 'media-gallery.css'), 'utf8');
assert(galleryCss.includes('--media-gap: 0'));
assert(galleryCss.includes('border: 0;'));

const productCss = fs.readFileSync(path.join(__dirname, '..', 'assets', 'product-page.css'), 'utf8');
assert(productCss.includes('margin-top: 0;'));
assert(productCss.includes('padding-top: 0;'));

console.log('media-gallery tests passed');
