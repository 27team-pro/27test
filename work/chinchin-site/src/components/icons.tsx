const base = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const IconChat = () => (
  <svg {...base} aria-hidden="true">
    <path d="M2.5 3.5h11v7.5h-6L4 13.5v-2.5H2.5z" />
  </svg>
);

export const IconKey = () => (
  <svg {...base} aria-hidden="true">
    <circle cx="5.5" cy="8" r="2.8" />
    <path d="M8.3 8H14M12 8v2.2M13.5 8v1.6" />
  </svg>
);

export const IconPlug = () => (
  <svg {...base} aria-hidden="true">
    <path d="M6 2v3M10 2v3M4 5h8v2.5a4 4 0 0 1-8 0zM8 11.5V14" />
  </svg>
);

export const IconSend = () => (
  <svg {...base} strokeWidth={1.6} aria-hidden="true">
    <path d="M14 2 7 9M14 2l-4.4 12-2.6-5-5-2.6z" />
  </svg>
);

export const IconHelp = () => (
  <svg {...base} strokeWidth={1.6} aria-hidden="true">
    <circle cx="8" cy="8" r="6.2" />
    <path d="M6.2 6.2a1.9 1.9 0 1 1 2.7 1.7c-.6.3-.9.7-.9 1.4" />
    <path d="M8 11.8v.2" />
  </svg>
);

export const IconMenu = () => (
  <svg {...base} strokeWidth={1.6} aria-hidden="true">
    <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" />
  </svg>
);

export const IconClose = () => (
  <svg {...base} strokeWidth={1.6} aria-hidden="true">
    <path d="m4 4 8 8M12 4l-8 8" />
  </svg>
);

export const IconSignOut = () => (
  <svg {...base} aria-hidden="true">
    <path d="M6.5 3H3.5v10h3M10 5.5 12.5 8 10 10.5M12.5 8H6.5" />
  </svg>
);
