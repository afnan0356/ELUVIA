import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(10, 10, 10, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      <nav style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
      }}>

        {/* Logo */}
        <Link to="/" style={{
          fontSize: '20px',
          fontWeight: '700',
          color: 'var(--text-primary)',
          textDecoration: 'none',
          letterSpacing: '0.08em',
          flexShrink: 0,
        }}>
          ELUVIA
        </Link>

        {/* Search bar placeholder */}
        <div style={{
          flex: 1,
          maxWidth: '480px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '8px 14px',
          cursor: 'text',
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Search colors, moods, HEX...</span>
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexShrink: 0 }}>
          <Link to="/search" style={{ fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none', letterSpacing: '0.02em' }}>
            Explore
          </Link>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </div>
        </div>

      </nav>
    </header>
  )
              }
