import { useParams } from 'react-router-dom'

export default function ColorDetailPage() {
  const { name } = useParams()
  const placeholderHex = '#c9a96e'

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>

        {/* Color preview */}
        <div style={{ flex: '0 0 auto' }}>
          <div style={{
            width: '320px',
            height: '320px',
            borderRadius: 'var(--radius-xl)',
            background: placeholderHex,
            border: '1px solid var(--border)',
          }} />
          <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
            {['#c9a96e', '#d4b980', '#b89058'].map(shade => (
              <div key={shade} style={{
                flex: 1,
                height: '40px',
                borderRadius: 'var(--radius-sm)',
                background: shade,
                border: '1px solid var(--border)',
                cursor: 'pointer',
              }} />
            ))}
          </div>
        </div>

        {/* Info panel */}
        <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '700', color: 'var(--text-primary)', textTransform: 'capitalize' }}>
              {name?.replace(/-/g, ' ') || 'Color Name'}
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              Color description placeholder. This will contain the mood, vibe, and meaning of this color.
            </p>
          </div>

          {/* Values */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {['HEX', 'RGB', 'HSL'].map(type => (
              <div key={type} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
              }}>
                <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>{type}</span>
                <span style={{ fontSize: '13px', color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                  {type === 'HEX' ? placeholderHex : type === 'RGB' ? 'rgb(201, 169, 110)' : 'hsl(38, 50%, 61%)'}
                </span>
                <button style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '4px 10px',
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                }}>
                  Copy
                </button>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['luxury', 'warm', 'golden', 'elegant'].map(tag => (
              <span key={tag} style={{
                fontSize: '11px',
                fontWeight: '500',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '4px',
                padding: '4px 10px',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Similar colors placeholder */}
      <div style={{ marginTop: '64px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '20px' }}>Similar Colors</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {['#b8976a', '#d4a853', '#8c7a5a', '#e8c17a', '#a08040'].map(hex => (
            <div key={hex} style={{
              width: '80px',
              height: '80px',
              borderRadius: 'var(--radius-md)',
              background: hex,
              border: '1px solid var(--border)',
              cursor: 'pointer',
              flexShrink: 0,
            }} />
          ))}
        </div>
      </div>

    </div>
  )
}
