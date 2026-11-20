import { useState, type ReactElement } from 'react';
import { LogoMark } from './Logo';
import { IconChat, IconClose, IconHelp, IconKey, IconMenu, IconPlug, IconSignOut } from './icons';
import type { Page } from '../demo';
import { brand } from '../brand';

type Props = {
  page: Page;
  onNavigate: (p: Page) => void;
  onSignOut: () => void;
  children: React.ReactNode;
};

const NAV: { id: Page; label: string; icon: () => ReactElement }[] = [
  { id: 'chat', label: 'Chat', icon: IconChat },
  { id: 'keys', label: 'API keys', icon: IconKey },
  { id: 'connect', label: 'Connect', icon: IconPlug },
];

const TITLES: Record<Page, string> = {
  chat: 'Chat',
  keys: 'API keys',
  connect: 'Connect',
};

export function AppShell({ page, onNavigate, onSignOut, children }: Props) {
  const [open, setOpen] = useState(false);
  const go = (p: Page) => {
    onNavigate(p);
    setOpen(false);
  };

  return (
    <div className="shell">
      {open && <div className="scrim" onClick={() => setOpen(false)} />}
      <aside className={`sidebar${open ? ' open' : ''}`}>
        <div className="sidebar-logo">
          <LogoMark size={22} />
          <span style={{ fontWeight: 600, fontSize: 13.5, letterSpacing: '-0.01em' }}>{brand.name}</span>
          <button className="burger" style={{ marginLeft: 'auto' }} onClick={() => setOpen(false)} aria-label="Close menu">
            <IconClose />
          </button>
        </div>
        <nav className="side-nav">
          {NAV.map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`side-link${page === id ? ' on' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                go(id);
              }}
            >
              <Icon />
              {label}
            </a>
          ))}
        </nav>
        <div className="side-foot">
          <div className="balance-card">
            <div className="lbl">Balance</div>
            <div className="num">$12.40</div>
          </div>
          <a
            href="#signin"
            className="side-link"
            onClick={(e) => {
              e.preventDefault();
              onSignOut();
            }}
          >
            <IconSignOut />
            Sign out
          </a>
        </div>
      </aside>

      <div className="main">
        <div className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button className="burger" onClick={() => setOpen(true)} aria-label="Open menu">
              <IconMenu />
            </button>
            <div className="crumb">
              {brand.name} · <b>{TITLES[page]}</b>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <a className="help-fab in-bar" href={`mailto:${brand.supportEmail}`} aria-label={`${brand.name} help`}>
              <IconHelp />
            </a>
            <span className="pill">
              <span className="dot-ok" />
              demo
            </span>
          </div>
        </div>
        {children}
      </div>
      <HelpFab />
    </div>
  );
}

function HelpFab() {
  return (
    <a className="help-fab out" href={`mailto:${brand.supportEmail}`} aria-label={`${brand.name} help`}>
      <IconChat />
    </a>
  );
}
