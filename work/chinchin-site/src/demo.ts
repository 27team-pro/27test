// Fake demo data only. Nothing here talks to a network.
import { brand } from './brand';

export type Page = 'chat' | 'keys' | 'connect';

export type Msg = { role: 'ai' | 'me'; text: string };

export const maskKey = (k: string) => `${k.slice(0, 8)}${'•'.repeat(18)}${k.slice(-4)}`;

export const keys = [
  { name: 'main', key: `${brand.keyPrefix}7f3c9a2e5b8d4f61`, created: '2026-09-02', lastUsed: '2 min ago', active: true },
  { name: 'scripts', key: `${brand.keyPrefix}1d8b40c7e2a95f36`, created: '2026-10-14', lastUsed: '3 days ago', active: true },
  { name: 'old-laptop', key: `${brand.keyPrefix}9a2e7f3c5b8d4f61`, created: '2026-05-21', lastUsed: '2 months ago', active: false },
];

export const initialMessages: Msg[] = [
  {
    role: 'ai',
    text: `Hi, I'm ${brand.name}. This is a demo chat: try a message and I'll answer with a canned reply.`,
  },
  { role: 'me', text: 'Which models can I call through the API?' },
  {
    role: 'ai',
    text: 'Many providers, one key. Each model has its own id and shows up in GET /v1/models.',
  },
];

export const canned =
  "This is a demo answer — no model was called and no tokens were spent. In the real product this reply would stream from the model you picked in the selector above.";
