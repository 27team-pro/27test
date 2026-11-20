// Single source of truth for the Chinchin brand. Change it here, not in pages.
export const brand = {
  name: 'Chinchin',
  nameUpper: 'CHINCHIN',
  domain: 'chinchin.app',
  site: 'https://chinchin.app',
  apiBase: 'https://api.chinchin.app',
  apiUrl: 'https://api.chinchin.app/v1',
  keyPrefix: 'ch_live_',
  supportEmail: 'help@chinchin.app',
  accent: '#ff2d36',
  colors: {
    black: '#000000',
    panel: '#050505',
    surface: '#0d0d0f',
    surface2: '#131316',
    line: '#1c1c20',
    text: '#f2f2f3',
    muted: 'rgba(255,255,255,0.55)',
    faint: 'rgba(255,255,255,0.4)',
  },
  year: 2026,
} as const;
