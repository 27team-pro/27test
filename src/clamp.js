// Ограничивает число x диапазоном [min, max]: возвращает x, если оно внутри диапазона,
// иначе ближайшую границу.
export function clamp(x, min, max) {
  return Math.min(Math.max(x, min), max);
}
