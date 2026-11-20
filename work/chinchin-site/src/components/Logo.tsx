import type { ReactElement } from 'react';
import { brand } from '../brand';

/** Flat mark: rounded square with a 2x2 dot grid (one dot dimmed). */
export function LogoMark({ size = 22, radius = 14, className = '' }: { size?: number; radius?: number; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true">
      <rect width="64" height="64" rx={radius} fill={brand.accent} />
      <g fill="#fff">
        <circle cx="24" cy="24" r="6" />
        <circle cx="40" cy="24" r="6" />
        <circle cx="24" cy="40" r="6" />
        <circle cx="40" cy="40" r="6" fillOpacity=".35" />
      </g>
    </svg>
  );
}

const GLYPHS: Record<string, string[]> = {
  C: ['.###.', '#...#', '#....', '#....', '#....', '#...#', '.###.'],
  H: ['#...#', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  I: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '#####'],
  N: ['#...#', '##..#', '##..#', '#.#.#', '#..##', '#..##', '#...#'],
};

/**
 * Pixel-dot wordmark, in the spirit of the original: 1x1 dots on a 0.5 grid.
 * Rows are 7 tall, letters 2 apart, letters spaced 2 dots.
 */
export function LogoWordmark({ height = 12, className = '', label = brand.nameUpper }: { height?: number; className?: string; label?: string }) {
  const width = 55;
  const dots: ReactElement[] = [];
  let x = 0;
  for (const ch of label) {
    const rows = GLYPHS[ch];
    if (!rows) {
      x += 3;
      continue;
    }
    rows.forEach((row, y) => {
      [...row].forEach((cell, cx) => {
        if (cell === '#') dots.push(<circle key={`${x}-${y}-${cx}`} cx={x + cx} cy={y} r={0.42} fill="currentColor" />);
      });
    });
    x += 7;
  }
  return (
    <svg viewBox={`-0.5 -0.5 ${width} 8`} style={{ height, width: 'auto' }} className={className} role="img" aria-label={label}>
      {dots}
    </svg>
  );
}

export function Logo({ size = 22, wordHeight = 12 }: { size?: number; wordHeight?: number }) {
  return (
    <span className="logo">
      <LogoMark size={size} className="logo-mark" />
      <LogoWordmark height={wordHeight} />
      <span className="logo-suffix">Code</span>
    </span>
  );
}
