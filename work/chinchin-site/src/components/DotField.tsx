import { useEffect, useRef } from 'react';

/**
 * Decorative dot field for the sign-in panel: a grid of tiny dots that drift and
 * glow in warm/cool patches, with a few "constellation" streaks. Repainted at ~30fps
 * (the original uses the same idea with rAF-throttling); silent on reduced motion.
 */
export function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let t = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const step = 9;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const blobs = [
      { x: 0.24, y: 0.28, r: 0.42, c: [255, 90, 58], a: 1 },
      { x: 0.72, y: 0.34, r: 0.38, c: [120, 70, 255], a: 0.9 },
      { x: 0.5, y: 0.78, r: 0.44, c: [40, 120, 255], a: 0.8 },
      { x: 0.85, y: 0.8, r: 0.3, c: [255, 79, 208], a: 0.7 },
    ];

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, w, h);
      // dark radial base so the panel is not a flat black
      const base = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.7);
      base.addColorStop(0, 'rgba(14,14,18,1)');
      base.addColorStop(1, 'rgba(5,5,5,1)');
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);

      for (let y = step / 2; y < h; y += step) {
        for (let x = step / 2; x < w; x += step) {
          const nx = x / w;
          const ny = y / h;
          let best = 0;
          let col = [255, 255, 255];
          for (const b of blobs) {
            const bx = b.x + Math.sin(t + b.r * 9) * 0.06;
            const by = b.y + Math.cos(t * 0.8 + b.r * 7) * 0.06;
            const d = Math.hypot((nx - bx) * 1.1, ny - by);
            const v = Math.max(0, 1 - d / b.r) * b.a;
            if (v > best) {
              best = v;
              col = b.c;
            }
          }
          const twinkle = 0.75 + 0.25 * Math.sin(t * 3 + x * 0.05 + y * 0.04);
          const alpha = best * 0.85 * twinkle;
          if (alpha < 0.02) continue;
          const r = 0.6 + best * 1.2;
          ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}
