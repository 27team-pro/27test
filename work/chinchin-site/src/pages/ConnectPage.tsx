import { useState } from 'react';
import { brand } from '../brand';

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="codebox">
      <button
        className="copy-btn"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(code);
          } catch {
            /* ignore */
          }
          setCopied(true);
        }}
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
      {code.split('\n').map((line, i) => (
        <div key={i}>{highlight(line)}</div>
      ))}
    </div>
  );
}

function highlight(line: string) {
  const parts: React.ReactNode[] = [];
  const re = /("[^"]*"|'[^']*'|\$[A-Z_]+|curl|#.*$)/g;
  let last = 0;
  for (const m of line.matchAll(re)) {
    if (m.index! > last) parts.push(line.slice(last, m.index));
    const s = m[0];
    const cls = s.startsWith('"') || s.startsWith("'") ? 'c-str' : s.startsWith('#') ? 'c-cmt' : s.startsWith('$') ? 'c-key' : 'c-cmd';
    parts.push(<span key={m.index} className={cls}>{s}</span>);
    last = m.index! + s.length;
  }
  if (last < line.length) parts.push(line.slice(last));
  return parts;
}

export function ConnectPage() {
  const base = `${brand.apiBase}/v1`;
  return (
    <div className="page">
      <h1 className="page-title">Connect</h1>
      <p className="page-sub" style={{ marginBottom: 22 }}>
        Point any OpenAI-compatible client at {brand.apiBase}. No VPN, no extra SDK.
      </p>

      <div className="card stagger" style={{ ['--i' as string]: 1 }}>
        <h3>Base URL</h3>
        <p className="hint">Same for every model and every client.</p>
        <div className="codebox" style={{ display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'normal' }}>
          <span className="c-str">{base}</span>
        </div>
      </div>

      <div className="card stagger" style={{ ['--i' as string]: 2 }}>
        <h3>Three steps</h3>
        <p className="hint">Takes about a minute.</p>
        <ol className="steps">
          <li>
            <div>
              <b>Create a key</b>
              <p>Open API keys and press “Create key”. Keys start with {brand.keyPrefix}.</p>
            </div>
          </li>
          <li>
            <div>
              <b>Set the environment</b>
              <p>Export the key and the base URL once per shell.</p>
              <CodeBlock
                code={`export OPENAI_BASE_URL="${base}"\nexport OPENAI_API_KEY="${brand.keyPrefix}…"`}
              />
              <p className="hint" style={{ marginTop: 8, marginBottom: 0 }}>Code blocks scroll sideways on a phone.</p>
            </div>
          </li>
          <li>
            <div>
              <b>Send a request</b>
              <p>Any OpenAI-compatible call works; only the base URL and the key change.</p>
              <CodeBlock
                code={`curl ${base}/chat/completions \\
  -H "Authorization: Bearer $OPENAI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"chinchin-fast","messages":[{"role":"user","content":"hi"}]}'`}
              />
            </div>
          </li>
        </ol>
      </div>

      <div className="card stagger" style={{ ['--i' as string]: 3 }}>
        <h3>Editor / agent CLI</h3>
        <p className="hint">Point an Anthropic-compatible client at the same host.</p>
        <CodeBlock
          code={`export ANTHROPIC_BASE_URL="${base}"\nexport ANTHROPIC_AUTH_TOKEN="$OPENAI_API_KEY"\nagent`}
        />
      </div>

      <div className="card stagger" style={{ ['--i' as string]: 4 }}>
        <h3>Endpoints</h3>
        <p className="hint">Standard OpenAI shapes.</p>
        <div className="key-row"><span className="tag ok">GET</span><span className="k">/v1/models</span></div>
        <div className="key-row"><span className="tag ok">POST</span><span className="k">/v1/chat/completions</span></div>
        <div className="key-row"><span className="tag ok">POST</span><span className="k">/v1/messages</span></div>
      </div>
    </div>
  );
}
