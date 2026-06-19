import { readFileSync } from 'node:fs';

const app = readFileSync('src/main.jsx', 'utf8');
const dotGrid = readFileSync('src/DotGrid.jsx', 'utf8');
const dotGridCss = readFileSync('src/DotGrid.css', 'utf8');

for (const required of [
  'preload="none"',
  'requestIdleCallback',
  'loading="lazy"',
  'decoding="async"',
  'ScrollTrigger.config({ limitCallbacks: true',
]) {
  if (!app.includes(required)) throw new Error(`Missing performance optimization: ${required}`);
}

for (const required of [
  'IntersectionObserver',
  "document.addEventListener('visibilitychange'",
  'window.innerWidth',
  'window.innerHeight',
]) {
  if (!dotGrid.includes(required)) throw new Error(`DotGrid is not viewport-optimized: ${required}`);
}

if (!dotGridCss.includes('position: fixed;')) {
  throw new Error('DotGrid canvas must be viewport-fixed instead of full-page sized.');
}

console.log('Performance guard checks passed.');
