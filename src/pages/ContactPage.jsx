export default function ContactPage() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: 'var(--space-16) var(--space-6)' }}>

      <div style={{ marginBottom: 'var(--space-12)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)' }}>
          Contact
        </span>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
          Get in Touch
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.7', maxWidth: '400px' }}>
          ELUVIA is an open project. Feedback, suggestions, and contributions are welcome.
        </p>
      </div>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-8)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-6)',
      }}>
        {[
          {
            label: 'GitHub',
            value: 'github.com/afnan0356/ELUVIA',
            icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            ),
          },
          {
            label: 'Email',
            value: 'mdafnan0356@gmail.com',
            icon: (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            ),
          },
        ].map(item => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div style={{
              width: '36px', height: '36px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-secondary)',
              flexShrink: 0,
            }}>
              {item.icon}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {item.label}
              </span>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
