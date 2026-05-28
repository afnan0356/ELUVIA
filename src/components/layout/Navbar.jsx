import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar'

export default function Navbar() {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(10,10,10,0.85)',
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

        <div style={{ flex: 1, maxWidth: '480px' }}>
          <SearchBar />
        </div>

        <Link to="/search" style={{
          fontSize: '13px',
          color: 'var(--text-secondary)',
          textDecoration: 'none',
          letterSpacing: '0.02em',
          flexShrink: 0,
        }}>
          Explore
        </Link>
      </nav>
    </header>
  )
}
