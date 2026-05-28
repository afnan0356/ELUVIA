export default function SearchPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>

      {/* Header */}
      <div style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)' }}>Explore Colors</h1>
        <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Search by name, HEX, mood, or keyword</span>
      </div>

      {/* Search bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '14px 20px',
        marginBottom: '32px',
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <span style={{ fontSize: '15px', color: 'var(--text-muted)' }}>Search placeholder...</span>
      </div>

      {/* Filter row */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
        {['All', 'Luxury', 'Calm', 'Dark', 'Neon', 'Soft', 'Modern', 'Corporate', 'Creative'].map(f => (
          <div key={f} style={{
            padding: '7px 16px',
            background: f === 'All' ? 'var(--bg-elevated)' : 'var(--bg-card)',
            border: `1px solid ${f === 'All' ? 'var(--border)' : 'var(--border-subtle)'}`,
            borderRadius: 'var(--radius-xl)',
            fontSize: '12px',
            fontWeight: '500',
            color: f === 'All' ? 'var(--text-primary)' : 'var(--text-secondary)',
            cursor: 'pointer',
          }}>
            {f}
          </div>
        ))}
      </div>

      {/* Results placeholder */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
      }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            opacity: 0.4,
          }}>
            <div style={{ height: '120px', background: 'var(--bg-elevated)' }} />
            <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ height: '12px', width: '70%', background: 'var(--bg-elevated)', borderRadius: '4px' }} />
              <div style={{ height: '10px', width: '40%', background: 'var(--bg-elevated)', borderRadius: '4px' }} />
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
