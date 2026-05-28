import { Link } from 'react-router-dom'

const LINKS = {
  Platform: [
    { to: '/', label: 'Home' },
    { to: '/search', label: 'Explore Colors' },
    { to: '/search?q=trending', label: 'Trending' },
  ],
  Company: [
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ],
  Legal: [
    { to: '/terms', label: 'Terms of Use' },
    { to: '/privacy', label: 'Privacy Policy' },
  ],
}

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      background: 'var(--bg-secondary)',
      paddingTop: 'var(--space-16)',
      paddingBottom: 'var(--space-8)',
      marginTop: 'auto',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 var(--space-6)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-12)',
      }}>

        {/* Top grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto repeat(3, 1fr)',
          gap: 'var(--space-8)',
          flexWrap: 'wrap',
        }}>

          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', paddingRight: 'var(--space-10)' }}>
            <span style={{
              fontSize: '17px',
              fontWeight: '700',
              color: 'var(--text-primary)',
              letterSpacing: '0.1em',
            }}>
              ELUVIA
            </span>
            <p style={{
              fontSize: '13px',
              color: 'var(--text-muted)',
              lineHeight: '1.7',
              maxWidth: '200px',
            }}>
              Premium color discovery.<br />Free, forever.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <span style={{
                fontSize: '10px',
                fontWeight: '600',
                color: 'var(--text-muted)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: 'var(--space-1)',
              }}>
                {group}
              </span>
              {items.map(item => (
                <Link
                  key={item.to}
                  to={item.to}
                  style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    transition: 'color var(--transition-fast)',
                    width: 'fit-content',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: 'var(--space-6)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-3)',
        }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} ELUVIA. All rights reserved.
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Built with assistance from Claude &amp; ChatGPT
          </span>
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          footer > div > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
          footer > div > div:first-child > div:first-child {
            grid-column: 1 / -1;
            padding-right: 0 !important;
          }
        }
      `}</style>
    </footer>
  )
}
