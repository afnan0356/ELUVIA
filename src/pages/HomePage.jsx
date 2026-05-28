import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ColorCard from '../components/ui/ColorCard'
import SearchBar from '../components/SearchBar'
import ColorMixer from '../components/tools/ColorMixer'
import RandomColor from '../components/tools/RandomColor'
import { colors } from '../data/colors'
import { filterByMood } from '../utils/colorUtils'

const MOODS = ['all', 'luxury', 'calm', 'dark', 'neon', 'soft', 'modern', 'corporate', 'creative']
const TRENDING_IDS = ['dune-gold', 'obsidian-veil', 'arctic-mist', 'ember-glow', 'plasma-violet', 'midnight-wine', 'copper-patina', 'electric-cyan']

const sectionStyle = (bg = 'transparent', bordered = false) => ({
  background: bg,
  borderTop: bordered ? '1px solid var(--border-subtle)' : 'none',
  borderBottom: bordered ? '1px solid var(--border-subtle)' : 'none',
  padding: 'var(--space-16) var(--space-6)',
})

const innerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
}

const sectionHeading = (title, sub) => (
  <div style={{ marginBottom: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
    <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{title}</h2>
    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{sub}</span>
  </div>
)

export default function HomePage() {
  const [activeMood, setActiveMood] = useState('all')
  const navigate = useNavigate()

  const trendingColors = TRENDING_IDS.map(id => colors.find(c => c.id === id)).filter(Boolean)
  const moodColors = filterByMood(activeMood, colors).slice(0, 8)

  return (
    <div>

      {/* Hero */}
      <section style={{
        minHeight: '500px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'var(--space-20) var(--space-6) var(--space-16)',
        background: 'radial-gradient(ellipse at 50% -10%, rgba(201,169,110,0.07) 0%, transparent 65%)',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', maxWidth: '580px', width: '100%' }}>
          <span style={{
            fontSize: '10px',
            fontWeight: '700',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
          }}>
            Color Discovery Platform
          </span>
          <h1 style={{
            fontSize: 'clamp(38px, 6vw, 62px)',
            fontWeight: '700',
            color: 'var(--text-primary)',
            lineHeight: '1.08',
            letterSpacing: '-0.025em',
          }}>
            Find Your Color.
          </h1>
          <p style={{
            fontSize: '15px',
            color: 'var(--text-secondary)',
            lineHeight: '1.75',
            maxWidth: '400px',
            margin: '0 auto',
          }}>
            Discover, explore, and understand colors through a premium, intelligent experience.
          </p>
          <div style={{ marginTop: 'var(--space-2)' }}>
            <SearchBar
              placeholder="Search by name, HEX, mood..."
              onSearch={q => navigate(`/search?q=${encodeURIComponent(q)}`)}
            />
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            {colors.length}+ curated premium colors
          </span>
        </div>
      </section>

      {/* Trending */}
      <section style={sectionStyle()}>
        <div style={innerStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-8)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>Trending Colors</h2>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Curated picks this week</span>
            </div>
            <button
              onClick={() => navigate('/search')}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '13px',
                color: 'var(--accent)',
                cursor: 'pointer',
                padding: '4px 0',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-dim)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--accent)'}
            >
              View all →
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 'var(--space-4)' }}>
            {trendingColors.map(c => (
              <ColorCard key={c.id} id={c.id} name={c.name} hex={c.hex} tag={c.tags[0]} />
            ))}
          </div>
        </div>
      </section>

      {/* Mood */}
      <section style={sectionStyle('var(--bg-secondary)', true)}>
        <div style={innerStyle}>
          {sectionHeading('Explore by Mood', 'Find colors that match your feeling')}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-10)' }}>
            {MOODS.map(mood => (
              <button
                key={mood}
                onClick={() => setActiveMood(mood)}
                style={{
                  padding: '8px 18px',
                  background: activeMood === mood ? 'var(--bg-elevated)' : 'var(--bg-card)',
                  border: `1px solid ${activeMood === mood ? 'var(--border-hover)' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-2xl)',
                  fontSize: '12px',
                  fontWeight: activeMood === mood ? '600' : '400',
                  color: activeMood === mood ? 'var(--text-primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all var(--transition-fast)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {mood === 'all' ? 'All Moods' : mood}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 'var(--space-4)' }}>
            {moodColors.map(c => (
              <ColorCard key={c.id} id={c.id} name={c.name} hex={c.hex} tag={c.tags[0]} />
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section style={sectionStyle()}>
        <div style={innerStyle}>
          {sectionHeading('Color Tools', 'Mix, generate, and explore')}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>Color Mixer</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Blend two colors together</span>
              </div>
              <ColorMixer />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>Random Color</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Discover something unexpected</span>
              </div>
              <RandomColor />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
