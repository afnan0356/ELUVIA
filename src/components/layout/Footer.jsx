import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      background: 'var(--bg-secondary)',
      padding: '48px 24px 32px',
      marginTop: 'auto',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}>

        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>

          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '0.08em' }}>
              ELUVIA
            </span>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '240px', lineHeight: '1.6' }}>
              Premium color discovery platform.
            </span>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Platform</span>
              <Link to="/search" style={{ fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none' }}>Explore</Link>
              <Link to="/" style={{ fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none' }}>Trending</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Company</span>
              <Link to="/about" style={{ fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none' }}>About</Link>
              <Link to="/contact" style={{ fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none' }}>Contact</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Legal</span>
              <Link to="/terms" style={{ fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none' }}>Terms</Link>
              <Link to="/privacy" style={{ fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'none' }}>Privacy</Link>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            © 2025 ELUVIA. Free forever.
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Built with assistance from Claude &amp; ChatGPT
          </span>
        </div>

      </div>
    </footer>
  )
}
