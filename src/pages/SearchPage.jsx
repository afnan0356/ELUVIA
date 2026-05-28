import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import ColorCard from '../components/ui/ColorCard'
import SearchBar from '../components/SearchBar'
import { colors } from '../data/colors'
import { searchColors, filterByMood } from '../utils/colorUtils'

const FILTERS = ['all', 'luxury', 'calm', 'dark', 'neon', 'soft', 'modern', 'corporate', 'creative']

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    setQuery(searchParams.get('q') || '')
  }, [searchParams])

  let results = query.trim() ? searchColors(query, colors) : colors
  if (activeFilter !== 'all') {
    results = filterByMood(activeFilter, results)
  }

  function handleSearch(q) {
    navigate(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>

      <div style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)' }}>
          {query ? `Results for "${query}"` : 'Explore Colors'}
        </h1>
        <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          {results.length} color{results.length !== 1 ? 's' : ''} found
        </span>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <SearchBar placeholder="Search by name, HEX, mood..." onSearch={handleSearch} />
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
        {FILTERS.map(f => (
          <div
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              padding: '7px 16px',
              background: activeFilter === f ? 'var(--bg-elevated)' : 'var(--bg-card)',
              border: `1px solid ${activeFilter === f ? 'var(--border)' : 'var(--border-subtle)'}`,
              borderRadius: 'var(--radius-xl)',
              fontSize: '12px',
              fontWeight: activeFilter === f ? '600' : '400',
              color: activeFilter === f ? 'var(--text-primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              textTransform: 'capitalize',
              transition: 'all 0.15s',
            }}
          >
            {f === 'all' ? 'All' : f}
          </div>
        ))}
      </div>

      {results.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {results.map(c => (
            <ColorCard key={c.id} id={c.id} name={c.name} hex={c.hex} tag={c.tags[0]} />
          ))}
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px',
          gap: '12px',
        }}>
          <span style={{ fontSize: '32px' }}>◌</span>
          <span style={{ fontSize: '16px', color: 'var(--text-primary)', fontWeight: '500' }}>No colors found</span>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Try a different name, HEX code, or mood</span>
        </div>
      )}

    </div>
  )
}
