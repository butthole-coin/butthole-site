import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LOGO_URL = 'https://quantum-assets.fly.dev/assets/bhl.png';

// Typewriter Logo Component
function TypewriterLogo() {
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState('typing');
  const fullText = 'BUTTHOLE';
  
  useEffect(() => {
    let timeout;
    
    if (phase === 'typing') {
      if (displayText.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => setPhase('pausing'), 100);
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 2500);
    } else if (phase === 'deleting') {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 60);
      } else {
        timeout = setTimeout(() => setPhase('typing'), 500);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [displayText, phase]);
  
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '10px'
    }}>
      <img 
        src={LOGO_URL} 
        alt="Butthole Coin" 
        style={{ 
          width: '32px', 
          height: '32px',
          borderRadius: '50%'
        }} 
      />
      <span style={{ 
        fontSize: '14px', 
        fontWeight: 'bold', 
        letterSpacing: '2px',
        minWidth: '110px',
        color: '#fff'
      }}>
        ${displayText}
        <span style={{ 
          marginLeft: '2px',
          animation: 'blink 0.8s infinite'
        }}>|</span>
      </span>
      <style>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

const roadmapPhases = [
  {
    phase: 'PHASE 1',
    title: 'THE AWAKENING',
    status: 'completed',
    items: [
      { text: 'Token Launch on Solana', done: true },
      { text: 'Community Building', done: true },
      { text: 'Social Media Presence', done: true },
      { text: 'Website Launch', done: true },
      { text: '1,000+ Holders', done: true },
      { text: 'CoinGecko Listing', done: true },
    ]
  },
  {
    phase: 'PHASE 2',
    title: 'THE EXPANSION',
    status: 'completed',
    items: [
      { text: 'Forbes Digital Assets Feature', done: true },
      { text: 'MEXC Listing', done: true },
      { text: 'Moonshot Listing', done: true },
      { text: 'BitGet Listing', done: true },
      { text: 'CoinEx Listing', done: true },
      { text: 'XT.COM Listing', done: true },
      { text: 'Raydium DEX', done: true },
      { text: '25,000+ Holders', done: true },
      { text: 'Butthole.exchange Launch', done: true },
    ]
  },
  {
    phase: 'PHASE 3',
    title: 'WORLD DOMINATION',
    status: 'in-progress',
    items: [
      { text: 'Tier 1 Exchange Listings', done: false },
      { text: '$1 Billion Market Cap', done: false },
      { text: 'Global Brand Recognition', done: false },
      { text: 'Butthole DAO', done: false },
      { text: 'Real World Utility', done: false },
      { text: 'The Great Clenching', done: false },
    ]
  }
];

export default function Roadmap() {
  useEffect(() => {
    document.title = 'Roadmap | Butthole Coin';
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      fontFamily: "'Space Mono', monospace",
      overflow: 'hidden'
    }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <TypewriterLogo />
        </Link>
        
        <div style={{ display: 'flex', gap: '30px' }}>
          <Link to="/" style={{ color: '#666', textDecoration: 'none', fontSize: '12px', letterSpacing: '2px' }}>HOME</Link>
          <Link to="/whitepaper" style={{ color: '#666', textDecoration: 'none', fontSize: '12px', letterSpacing: '2px' }}>WHITEPAPER</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        paddingTop: '150px',
        paddingBottom: '80px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: 'clamp(48px, 10vw, 96px)',
          fontWeight: '100',
          letterSpacing: '20px',
          marginBottom: '20px'
        }}>
          ROADMAP
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#666',
          letterSpacing: '4px'
        }}>
          THE PATH TO GLORY
        </p>
      </section>

      {/* Roadmap Timeline */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 40px 100px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px'
        }}>
          {roadmapPhases.map((phase, idx) => (
            <div 
              key={idx}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${phase.status === 'completed' ? 'rgba(0,255,100,0.3)' : phase.status === 'in-progress' ? 'rgba(255,200,0,0.3)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '16px',
                padding: '30px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Status Badge */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                fontSize: '10px',
                padding: '4px 10px',
                borderRadius: '12px',
                background: phase.status === 'completed' ? 'rgba(0,255,100,0.15)' : phase.status === 'in-progress' ? 'rgba(255,200,0,0.15)' : 'rgba(255,255,255,0.05)',
                color: phase.status === 'completed' ? '#0f6' : phase.status === 'in-progress' ? '#fc0' : '#666',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                {phase.status === 'completed' ? '✓ Complete' : phase.status === 'in-progress' ? '◎ In Progress' : '○ Upcoming'}
              </div>

              {/* Phase Header */}
              <div style={{
                fontSize: '11px',
                color: '#666',
                letterSpacing: '3px',
                marginBottom: '8px'
              }}>
                {phase.phase}
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '25px',
                letterSpacing: '2px'
              }}>
                {phase.title}
              </h3>

              {/* Items */}
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {phase.items.map((item, itemIdx) => (
                  <li 
                    key={itemIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 0',
                      borderBottom: itemIdx < phase.items.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      fontSize: '13px',
                      color: item.done ? '#fff' : '#555'
                    }}
                  >
                    <span style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: item.done ? 'rgba(0,255,100,0.2)' : 'rgba(255,255,255,0.05)',
                      fontSize: '10px'
                    }}>
                      {item.done ? '✓' : '○'}
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '40px',
        textAlign: 'center'
      }}>
        <p style={{ color: '#444', fontSize: '12px', letterSpacing: '2px' }}>
          © 2025 BUTTHOLE COIN. ONE CANNOT FART WITHOUT A BUTTHOLE.
        </p>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '30px' }}>
          <a href="https://x.com/thebuttholecoin" target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none', fontSize: '12px' }}>𝕏</a>
          <a href="https://t.me/buttholecoinportal" target="_blank" rel="noopener noreferrer" style={{ color: '#666', textDecoration: 'none', fontSize: '12px' }}>TELEGRAM</a>
        </div>
      </footer>
    </div>
  );
}

