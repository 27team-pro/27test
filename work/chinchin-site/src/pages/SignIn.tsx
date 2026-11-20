import { useState } from 'react';
import { brand } from '../brand';
import { Logo } from '../components/Logo';
import { DotField } from '../components/DotField';

export function SignIn({ onSignIn }: { onSignIn: () => void }) {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    const v = key.trim();
    if (!v) {
      setError('Enter your API key to continue');
      return;
    }
    if (!v.startsWith(brand.keyPrefix)) {
      setError(`Key must start with ${brand.keyPrefix}`);
      return;
    }
    onSignIn();
  };

  return (
    <main className="signin">
      <div className="signin-frame">
        <section className="signin-left">
          <header className="signin-head rise">
            <Logo />
            <a className="pill" href={`mailto:${brand.supportEmail}`}>
              {brand.name} help
            </a>
          </header>

          <div className="signin-body">
            <div className="badge rise rise-2">
              Code <span>— no sign-up and no password</span>
            </div>
            <h1 className="signin-title rise rise-3">One key for chat, API and your editor</h1>

            <form className="key-form rise rise-4" onSubmit={(e) => { e.preventDefault(); submit(); }}>
              <label className="key-label">
                <span className="key-tag">Key</span>
                <input
                  className="key-input"
                  value={key}
                  onChange={(e) => { setKey(e.target.value); setError(''); }}
                  placeholder={`${brand.keyPrefix}…`}
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Key"
                />
                <button className={`key-submit${key.trim() ? ' ready' : ''}`} type="submit">
                  Sign in with key
                </button>
              </label>
              {error ? <p className="key-error">{error}</p> : null}
              <p className="key-hint">Demo build — any key starting with {brand.keyPrefix} opens the local cabinet.</p>
            </form>
          </div>

          <footer className="signin-foot rise rise-4">
            <span>© {brand.year} {brand.name}</span>
            <span>
              <a href={`https://${brand.domain}`}>{brand.domain}</a> ·{' '}
              <a href={`mailto:${brand.supportEmail}`}>Support</a>
            </span>
          </footer>
        </section>

        <aside className="signin-panel panel-rise">
          <DotField />
          <div className="panel-float">
            <span className="orb">
              <span className="orb-aura">
                <i className="orb-ring orb-ring-a" />
                <i className="orb-ring orb-ring-b" />
                <i className="orb-ring orb-ring-c" />
                <i className="orb-ring orb-ring-in" />
              </span>
              <span className="orb-core" />
              <span className="orb-eyes">
                <span className="orb-eye" />
                <span className="orb-eye r" />
              </span>
            </span>
          </div>
        </aside>
      </div>
    </main>
  );
}
