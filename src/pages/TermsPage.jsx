import { useLocation } from 'react-router-dom'

const SECTIONS = {
  terms: {
    title: 'Terms of Use',
    items: [
      { heading: 'Usage', body: 'ELUVIA is a free, public platform. You may use it for personal and commercial projects without restriction.' },
      { heading: 'No Warranty', body: 'The platform is provided as-is. We make no guarantees about accuracy, availability, or fitness for a particular purpose.' },
      { heading: 'No Accounts', body: 'ELUVIA requires no registration. No personal data is collected or stored.' },
      { heading: 'Attribution', body: 'Attribution is appreciated but not required when using color data from ELUVIA.' },
      { heading: 'Changes', body: 'These terms may be updated at any time without notice.' },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    items: [
      { heading: 'No Data Collection', body: 'ELUVIA does not collect, store, or transmit any personal information.' },
      { heading: 'No Cookies', body: 'No tracking cookies or analytics are used.' },
      { heading: 'No Accounts', body: 'No login, no registration, no user profiles.' },
      { heading: 'Local Only', body: 'All functionality runs entirely in your browser. Nothing leaves your device.' },
      { heading: 'Third Parties', body: 'No third-party trackers, advertising networks, or data brokers are used.' },
    ],
  },
}

export default function TermsPage() {
  const { pathname } = useLocation()
  const isPrivacy = pathname.includes('privacy')
  const section = isPrivacy ? SECTIONS.privacy : SECTIONS.terms

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: 'var(--space-16) var(--space-6)' }}>

      <div style={{ marginBottom: 'var(--space-12)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)' }}>
          Legal
        </span>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
          {section.title}
        </h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {section.items.map((item, i) => (
          <div key={i} style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-5) var(--space-6)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
          }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>{item.heading}</span>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>{item.body}</span>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 'var(--space-8)', fontSize: '12px', color: 'var(--text-muted)' }}>
        Last updated: {new Date().getFullYear()}. ELUVIA is a free, open project.
      </p>
    </div>
  )
}
