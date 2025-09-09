const assert = require('assert');

function paddingPercent(aspectRatio) {
  return (1 / aspectRatio) * 100;
}

// Basic aspect ratio conversions ensure proportional display
assert.strictEqual(paddingPercent(1), 100);
assert.strictEqual(paddingPercent(2), 50);
assert(Math.abs(paddingPercent(1.5) - 66.6666) < 0.0001);

console.log('media-gallery tests passed');
