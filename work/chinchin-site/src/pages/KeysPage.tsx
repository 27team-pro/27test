import { useState } from 'react';
import { brand } from '../brand';
import { keys, maskKey } from '../demo';

export function KeysPage() {
  const [list, setList] = useState(keys);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [created, setCreated] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const create = () => {
    const rand = Math.random().toString(36).slice(2, 18);
    const k = `${brand.keyPrefix}${rand}`;
    setList((l) => [{ name: `key-${l.length + 1}`, key: k, created: 'just now', lastUsed: 'never', active: true }, ...l]);
    setCreated(k);
    setCopied(false);
  };

  const copy = async () => {
    if (!created) return;
    try {
      await navigator.clipboard.writeText(created);
    } catch {
      /* clipboard may be blocked in preview — the key is shown anyway */
    }
    setCopied(true);
  };

  return (
    <div className="page">
      <h1 className="page-title">API keys</h1>
      <p className="page-sub" style={{ marginBottom: 22 }}>
        One key works for chat, the API and your editor. Keys here are fake demo values.
      </p>

      <div className="card stagger" style={{ ['--i' as string]: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <h3>Your keys</h3>
            <p className="hint">{list.filter((k) => k.active).length} active · {list.length} total</p>
          </div>
          <button className="btn primary" onClick={create}>Create key</button>
        </div>

        {created && (
          <div className="card" style={{ background: 'var(--panel)', padding: 14, marginBottom: 8 }}>
            <p className="hint" style={{ marginBottom: 8 }}>New key — copy it now, it is shown once in the real product.</p>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <code className="mono" style={{ flex: 1, minWidth: 200, fontSize: 13 }}>{created}</code>
              <button className="btn" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
            </div>
          </div>
        )}

        <div>
          {list.map((k) => (
            <div className="key-row" key={k.key}>
              <span className="tag dim">{k.name}</span>
              <span className="k">{revealed[k.key] ? k.key : maskKey(k.key)}</span>
              <button className="btn ghost" onClick={() => setRevealed((r) => ({ ...r, [k.key]: !r[k.key] }))}>
                {revealed[k.key] ? 'Hide' : 'Show'}
              </button>
              <span className={`tag ${k.active ? 'ok' : 'dim'}`}>{k.active ? 'active' : 'revoked'}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card stagger" style={{ ['--i' as string]: 2 }}>
        <h3>Usage this month</h3>
        <p className="hint">Requests and tokens are sample numbers.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 12 }}>
          {[
            ['Requests', '1 284'],
            ['Tokens in', '3.1M'],
            ['Tokens out', '640K'],
            ['Spent', '$12.40'],
          ].map(([l, v]) => (
            <div key={l} className="balance-card">
              <div className="lbl">{l}</div>
              <div className="num">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
