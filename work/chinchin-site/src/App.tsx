import { useCallback, useEffect, useState } from 'react';
import './index.css';
import { AppShell } from './components/AppShell';
import { SignIn } from './pages/SignIn';
import { ChatPage } from './pages/ChatPage';
import { KeysPage } from './pages/KeysPage';
import { ConnectPage } from './pages/ConnectPage';
import { initialMessages, type Msg, type Page } from './demo';

const PAGES: Page[] = ['chat', 'keys', 'connect'];

function pageFromHash(): Page {
  const id = location.hash.replace('#', '') as Page;
  return PAGES.includes(id) ? id : 'chat';
}

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [page, setPage] = useState<Page>(pageFromHash);
  const [messages, setMessages] = useState<Msg[]>(initialMessages);

  // The hash is the single source of truth for the current page.
  useEffect(() => {
    const onHash = () => setPage(pageFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = useCallback((p: Page) => {
    if (pageFromHash() !== p) history.pushState(null, '', `#${p}`);
    setPage(p);
  }, []);

  if (!signedIn) {
    return <SignIn onSignIn={() => setSignedIn(true)} />;
  }

  return (
    <AppShell
      page={page}
      onNavigate={navigate}
      onSignOut={() => {
        setSignedIn(false);
        history.replaceState(null, '', '#signin');
        setPage('chat');
      }}
    >
      {page === 'chat' && <ChatPage messages={messages} setMessages={setMessages} />}
      {page === 'keys' && <KeysPage />}
      {page === 'connect' && <ConnectPage />}
    </AppShell>
  );
}
