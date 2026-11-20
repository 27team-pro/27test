import { useEffect, useRef, useState } from 'react';
import { IconSend } from '../components/icons';
import { brand } from '../brand';
import { canned, type Msg } from '../demo';

export function ChatPage({ messages, setMessages }: { messages: Msg[]; setMessages: React.Dispatch<React.SetStateAction<Msg[]>> }) {
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const send = () => {
    const v = text.trim();
    if (!v || typing) return;
    setText('');
    setMessages((m) => [...m, { role: 'me', text: v }]);
    setTyping(true);
    timer.current = window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { role: 'ai', text: canned }]);
    }, 900);
  };

  return (
    <div className="chat-wrap">
      <div className="chat-log" ref={logRef}>
        {messages.map((m, i) => (
          <Bubble key={`m${i}`} m={m} />
        ))}
        {typing && (
          <div className="msg ai">
            <span className="who">{brand.name}</span>
            <span className="bubble" style={{ color: 'rgba(255,255,255,.45)' }}>typing…</span>
          </div>
        )}
      </div>
      <div className="chat-composer">
        <div className="chat-box">
          <textarea
            rows={1}
            value={text}
            placeholder={`Message ${brand.name}…`}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            aria-label="Message"
          />
          <button className="chat-send" onClick={send} aria-label="Send">
            <IconSend />
          </button>
        </div>
        <p className="chat-note">Demo mode · replies are canned, no requests leave the page</p>
      </div>
    </div>
  );
}

function Bubble({ m }: { m: Msg }) {
  return (
    <div className={`msg ${m.role}`}>
      <span className="who">{m.role === 'ai' ? brand.name : 'you'}</span>
      <span className="bubble">{m.text}</span>
    </div>
  );
}
