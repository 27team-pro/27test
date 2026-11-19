// Limits a number to the [min, max] range.
export function clamp(x, min, max) {
  return Math.min(Math.max(x, min), max);
}
