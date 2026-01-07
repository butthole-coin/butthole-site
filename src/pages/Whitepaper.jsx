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

const sections = [
  {
    id: 'abstract',
    title: 'ABSTRACT',
    content: `Butthole Coin ($BUTTHOLE) represents a paradigm shift in the cryptocurrency landscape. Built on the high-performance Solana blockchain, $BUTTHOLE is not just a meme token – it is a philosophical statement about the fundamental nature of existence.

The core thesis is simple yet profound: One cannot have a fart without a butthole.

This immutable truth, recognized across all cultures and species, forms the foundational principle of our tokenomics and community vision.`
  },
  {
    id: 'introduction',
    title: 'INTRODUCTION',
    content: `In the vast ecosystem of digital assets, countless projects attempt to solve complex problems or revolutionize industries. $BUTTHOLE takes a different approach – we embrace the simple, universal truths that unite humanity.

Since time immemorial, the butthole has served an essential biological function. Without it, the relief of flatulence would be impossible. This basic fact of nature inspired the creation of $BUTTHOLE, a token that pays homage to this unsung hero of the human anatomy.

The crypto market has seen dog coins, cat coins, and countless other animal-themed tokens. It's time for the body part that truly matters – the one thing every human being on Earth has in common.`
  },
  {
    id: 'tokenomics',
    title: 'TOKENOMICS',
    content: `$BUTTHOLE was launched with a fair and transparent distribution model:

• Total Supply: 1,000,000,000 BUTTHOLE
• Blockchain: Solana (SPL Token)
• Contract: CboMcTUYUcy9E6B3yGdFn6aEsGUnYV6yWeoeukw6pump

Distribution:
• 100% Fair Launch – No presale, no team allocation
• Liquidity Locked
• Contract Renounced

The tokenomics are designed to ensure maximum decentralization and community ownership. There are no hidden wallets, no vesting schedules, and no rug pull mechanisms.`
  },
  {
    id: 'technology',
    title: 'TECHNOLOGY',
    content: `$BUTTHOLE leverages the Solana blockchain for its unparalleled speed and low transaction costs:

• Transaction Speed: 400ms finality
• Transaction Cost: < $0.001
• Throughput: 65,000+ TPS theoretical capacity

The choice of Solana ensures that $BUTTHOLE transactions are fast, cheap, and environmentally friendly compared to proof-of-work alternatives.

Our custom swap interface at butthole.exchange provides seamless trading experiences with minimal slippage and competitive rates.`
  },
  {
    id: 'community',
    title: 'COMMUNITY',
    content: `The $BUTTHOLE community, affectionately known as "The Sphincters," represents one of the most dedicated and enthusiastic groups in cryptocurrency:

• 25,000+ Holders
• 22,000+ X (Twitter) Followers
• Active Telegram Community
• Featured on Forbes Digital Assets
• Listed on 6+ Major Exchanges

Community governance is a core principle. Major decisions are made through community consensus, ensuring that every Sphincter has a voice in the project's future.`
  },
  {
    id: 'roadmap',
    title: 'ROADMAP SUMMARY',
    content: `Phase 1: THE AWAKENING ✓
Token launch, community building, initial exchange listings

Phase 2: THE EXPANSION ✓
Major CEX listings (MEXC, Gate.io, BitGet, CoinEx, LBank, XT.COM), Forbes feature

Phase 3: THE ASCENSION (In Progress)
Strategic partnerships, community governance, NFT collection

Phase 4: WORLD DOMINATION
Tier 1 exchange listings, $1B market cap, global brand recognition, Butthole DAO

For detailed roadmap information, visit the Roadmap page.`
  },
  {
    id: 'legal',
    title: 'DISCLAIMER',
    content: `$BUTTHOLE is a meme cryptocurrency with no intrinsic value or expectation of financial return. This whitepaper is for entertainment and informational purposes only.

Cryptocurrency investments carry significant risk. Never invest more than you can afford to lose. $BUTTHOLE makes no guarantees about future price performance or project development.

This is not financial advice. Please conduct your own research before making any investment decisions.

The butthole, however, is an anatomical certainty.`
  }
];

export default function Whitepaper() {
  useEffect(() => {
    document.title = 'Whitepaper | Butthole Coin';
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
          <Link to="/roadmap" style={{ color: '#666', textDecoration: 'none', fontSize: '12px', letterSpacing: '2px' }}>ROADMAP</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        paddingTop: '150px',
        paddingBottom: '60px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: 'clamp(36px, 8vw, 72px)',
          fontWeight: '100',
          letterSpacing: '15px',
          marginBottom: '20px'
        }}>
          WHITEPAPER
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#666',
          letterSpacing: '4px'
        }}>
          VERSION 1.0 | THE BUTTHOLE MANIFESTO
        </p>
      </section>

      {/* Table of Contents */}
      <section style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 40px 60px'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '30px'
        }}>
          <h3 style={{
            fontSize: '12px',
            letterSpacing: '3px',
            color: '#666',
            marginBottom: '20px'
          }}>
            TABLE OF CONTENTS
          </h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {sections.map((section, idx) => (
              <a 
                key={idx}
                href={`#${section.id}`}
                style={{
                  color: '#888',
                  textDecoration: 'none',
                  fontSize: '13px',
                  padding: '8px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = '#888'}
              >
                <span>{section.title}</span>
                <span style={{ color: '#444' }}>{String(idx + 1).padStart(2, '0')}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 40px 100px'
      }}>
        {sections.map((section, idx) => (
          <div 
            key={idx}
            id={section.id}
            style={{
              marginBottom: '60px',
              paddingTop: '40px'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              marginBottom: '25px'
            }}>
              <span style={{
                fontSize: '11px',
                color: '#444',
                width: '30px'
              }}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <h2 style={{
                fontSize: '18px',
                fontWeight: '600',
                letterSpacing: '4px',
                color: '#fff'
              }}>
                {section.title}
              </h2>
            </div>
            <div style={{
              paddingLeft: '45px',
              fontSize: '14px',
              lineHeight: '1.8',
              color: '#aaa',
              whiteSpace: 'pre-line'
            }}>
              {section.content}
            </div>
          </div>
        ))}
      </section>

      {/* Contract Info */}
      <section style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 40px 80px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '30px',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '12px',
            letterSpacing: '3px',
            color: '#666',
            marginBottom: '15px'
          }}>
            CONTRACT ADDRESS
          </h3>
          <code style={{
            fontSize: '12px',
            color: '#fff',
            background: 'rgba(255,255,255,0.05)',
            padding: '10px 20px',
            borderRadius: '8px',
            display: 'inline-block',
            wordBreak: 'break-all'
          }}>
            CboMcTUYUcy9E6B3yGdFn6aEsGUnYV6yWeoeukw6pump
          </code>
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <a 
              href="https://solscan.io/token/CboMcTUYUcy9E6B3yGdFn6aEsGUnYV6yWeoeukw6pump"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#666',
                fontSize: '11px',
                textDecoration: 'none',
                letterSpacing: '2px'
              }}
            >
              VIEW ON SOLSCAN →
            </a>
          </div>
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

