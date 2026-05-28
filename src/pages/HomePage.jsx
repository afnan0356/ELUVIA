import ColorCard from '../components/ui/ColorCard'

const PLACEHOLDER_COLORS = [
  { name: 'Obsidian Veil', hex: '#1a1a2e', tag: 'dark' },
  { name: 'Dune Gold', hex: '#c9a96e', tag: 'luxury' },
  { name: 'Arctic Mist', hex: '#d4e5f7', tag: 'calm' },
  { name: 'Ember Glow', hex: '#e8613a', tag: 'creative' },
  { name: 'Sage Whisper', hex: '#8fad88', tag: 'soft' },
  { name: 'Void Blue', hex: '#0d1b2a', tag: 'dark' },
  { name: 'Chalk Rose', hex: '#e8c5c0', tag: 'soft' },
  { name: 'Chrome Slate', hex: '#5c6b7a', tag: 'corporate' },
]

const MOODS = ['Luxury', 'Calm', 'Dark', 'Neon', 'Soft', 'Modern', 'Corporate', 'Creative']

export default function HomePage() {
  return (
    <div>

      {/* Hero */}
      <section style={{
        minHeight: '520px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 24px',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.06) 0%, transparent 70%)',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '640px', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)' }}>
              Color Discovery
            </span>
            <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
              Find Your Color.
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.7', maxWidth: '480px', margin: '0 auto' }}>
              Discover, explore, and understand colors through a premium, intelligent experience.
            </p>
          </div>

          {/* Search placeholder */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '14px 20px',
            marginTop: '8px',
            cursor: 'text',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <span style={{ fontSize: '15px', color: 'var(--text-muted)', flex: 1, textAlign: 'left' }}>
              Search by name, HEX, mood...
            </span>
            <span style={{
              fontSize: '11px',
              color: 'var(--text-muted)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              padding: '2px 8px',
            }}>
              ↵
            </span>
          </div>
        </div>
      </section>

      {/* Trending Colors */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'var(--text-primary)' }}>Trending Colors</h2>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Curated picks this week</span>
          </div>
          <span style={{ fontSize: '13px', color: 'var(--accent)', cursor: 'pointer' }}>View all →</span>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px',
        }}>
          {PLACEHOLDER_COLORS.map((c) => (
            <ColorCard key={c.hex} name={c.name} hex={c.hex} tag={c.tag} />
          ))}
        </div>
      </section>

      {/* Explore by Mood */}
      <section style={{
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--bg-secondary)',
        padding: '64px 24px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'var(--text-primary)' }}>Explore by Mood</h2>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Find colors that match your feeling</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {MOODS.map((mood) => (
              <div key={mood} style={{
                padding: '10px 20px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xl)',
                fontSize: '13px',
                fontWeight: '500',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'border-color 0.2s, color 0.2s',
              }}>
                {mood}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Color Mixer placeholder */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'var(--text-primary)' }}>Color Mixer</h2>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Blend two colors together</span>
        </div>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
          padding: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '180px',
        }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Color mixer coming soon</span>
        </div>
      </section>

      {/* Random Color placeholder */}
      <section style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-secondary)',
        padding: '64px 24px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'var(--text-primary)' }}>Random Color</h2>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Discover something unexpected</span>
          </div>
          <button style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 24px',
            fontSize: '13px',
            fontWeight: '500',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            letterSpacing: '0.02em',
          }}>
            Generate Color
          </button>
        </div>
      </section>

    </div>
  )
}
