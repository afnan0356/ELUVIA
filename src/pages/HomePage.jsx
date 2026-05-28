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

export default function HomePage() {
  const [activeMood, setActiveMood] = useState('all')
  const navigate = useNavigate()

  const trendingColors = TRENDING_IDS.map(id => colors.find(c => c.id === id)).filter(Boolean)
  const moodColors = filterByMood(activeMood, colors).slice(0, 8)

  function handleSearch(query) {
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)' }}>
              Color Discovery
            </span>
            <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
              Find Your Color.
            </h1>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.7', maxWidth: '440px', margin: '0 auto' }}>
              Discover, explore, and understand colors through a premium, intelligent experience.
            </p>
          </div>
          <div style={{ marginTop: '8px' }}>
            <SearchBar placeholder="Search by name, HEX, mood..." onSearch={handleSearch} />
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
          <span onClick={() => navigate('/search')} style={{ fontSize: '13px', color: 'var(--accent)', cursor: 'pointer' }}>
            View all →
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {trendingColors.map(c => (
            <ColorCard key={c.id} id={c.id} name={c.name} hex={c.hex} tag={c.tags[0]} />
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}>
            {MOODS.map(mood => (
              <div
                key={mood}
                onClick={() => setActiveMood(mood)}
                style={{
                  padding: '10px 20px',
                  background: activeMood === mood ? 'var(--bg-elevated)' : 'var(--bg-card)',
                  border: `1px solid ${activeMood === mood ? 'var(--border)' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-xl)',
                  fontSize: '13px',
                  fontWeight: activeMood === mood ? '600' : '400',
                  color: activeMood === mood ? 'var(--text-primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.15s',
                }}
              >
                {mood === 'all' ? 'All Moods' : mood}
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {moodColors.map(c => (
              <ColorCard key={c.id} id={c.id} name={c.name} hex={c.hex} tag={c.tags[0]} />
            ))}
          </div>
        </div>
      </section>

      {/* Tools: Color Mixer + Random Color */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '600', color: 'var(--text-primary)' }}>Color Tools</h2>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Mix, generate, and explore</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'start' }}>

          {/* Color Mixer */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)' }}>Color Mixer</span>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Blend two colors together</span>
            </div>
            <ColorMixer />
          </div>

          {/* Random Color */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)' }}>Random Color</span>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Discover something unexpected</span>
            </div>
            <RandomColor />
          </div>

        </div>
      </section>

    </div>
  )
}
