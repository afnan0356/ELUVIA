import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import ColorCard from '../components/ui/ColorCard'
import SearchBar from '../components/SearchBar'
import { colors } from '../data/colors'
import { searchColors, filterByMood } from '../utils/colorUtils'

const FILTERS = ['all', 'luxury', 'calm', 'dark', 'neon', 'soft', 'modern', 'corporate', 'creative']

const SUGGESTED_IDS = ['dune-gold', 'arctic-mist', 'plasma-violet', 'ember-glow', 'copper-patina', 'midnight-wine']

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')

  const query = searchParams.get('q') || ''

  useEffect(() => {
    setActiveFilter('all')
  }, [query])

  const results = useMemo(() => {
    let base = query.trim() ? searchColors(query, colors) : colors
    if (activeFilter !== 'all') base = filterByMood(activeFilter, base)
    return base
  }, [query, activeFilter])

  const suggestedColors = SUGGESTED_IDS.map(id => colors.find(c => c.id === id)).filter(Boolean)

  function handleSearch(q) {
    navigate(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--space-12) var(--space-6)' }}>

      {/* Header */}
      <div style={{ marginBottom: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          {query ? `"${query}"` : 'Explore Colors'}
        </h1>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          {results.length} color{results.length !== 1 ? 's' : ''}
          {query ? ' found' : ' available'}
        </span>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <SearchBar placeholder="Search by name, HEX, mood..." onSearch={handleSearch} />
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-10)' }}>
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              padding: '6px 14px',
              background: activeFilter === f ? 'var(--bg-elevated)' : 'var(--bg-card)',
              border: `1px solid ${activeFilter === f ? 'var(--border-hover)' : 'var(--border-subtle)'}`,
              borderRadius: 'var(--radius-2xl)',
              fontSize: '12px',
              fontWeight: activeFilter === f ? '600' : '400',
              color: activeFilter === f ? 'var(--text-primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              textTransform: 'capitalize',
              transition: 'all var(--transition-fast)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {f === 'all' ? 'All' : f}
          </button>
        ))}
      </div>

      {/* Results */}
      {results.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 'var(--space-4)' }}>
          {results.map(c => (
            <ColorCard key={c.id} id={c.id} name={c.name} hex={c.hex} tag={c.tags[0]} />
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)', paddingTop: 'var(--space-8)' }}>
          {/* Empty state */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-3)',
            padding: 'var(--space-16) var(--space-6)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            textAlign: 'center',
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--space-2)',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-primary)' }}>No colors found</span>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '280px', lineHeight: '1.6' }}>
              Try a different name, HEX code, or mood keyword
            </span>
            <button
              onClick={() => navigate('/search')}
              style={{
                marginTop: 'var(--space-2)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '8px 18px',
                fontSize: '12px',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                transition: 'color var(--transition-fast)',
              }}
            >
              Browse all colors
            </button>
          </div>

          {/* Suggested */}
          <div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>
              You might like
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 'var(--space-4)' }}>
              {suggestedColors.map(c => (
                <ColorCard key={c.id} id={c.id} name={c.name} hex={c.hex} tag={c.tags[0]} />
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
