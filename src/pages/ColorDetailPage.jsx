import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { colors } from '../data/colors'
import { getColorById, getSimilarColors, hexToClipboard } from '../utils/colorUtils'
import ColorCard from '../components/ui/ColorCard'

export default function ColorDetailPage() {
  const { name } = useParams()
  const navigate = useNavigate()
  const [copiedField, setCopiedField] = useState(null)

  const color = getColorById(name, colors)

  function handleCopy(value, field) {
    hexToClipboard(value).then(() => {
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 1500)
    })
  }

  if (!color) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '32px' }}>◌</span>
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text-primary)' }}>Color not found</h1>
        <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>This color doesn't exist in our database.</span>
        <button onClick={() => navigate('/search')} style={{
          marginTop: '8px',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '10px 20px',
          fontSize: '13px',
          color: 'var(--text-primary)',
          cursor: 'pointer',
        }}>
          Browse all colors
        </button>
      </div>
    )
  }

  const similar = getSimilarColors(color, colors, 6)
  const rgbStr = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`
  const hslStr = `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`

  const valueRows = [
    { label: 'HEX', value: color.hex },
    { label: 'RGB', value: rgbStr },
    { label: 'HSL', value: hslStr },
  ]

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-muted)',
          fontSize: '13px',
          marginBottom: '36px',
          padding: 0,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
        </svg>
        Back
      </button>

      <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>

        {/* Left: color preview */}
        <div style={{ flex: '0 0 auto' }}>
          <div style={{
            width: '300px',
            height: '300px',
            borderRadius: 'var(--radius-xl)',
            background: color.hex,
            border: '1px solid var(--border)',
            boxShadow: `0 24px 60px ${color.hex}33`,
          }} />
        </div>

        {/* Right: info */}
        <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '700', color: 'var(--text-primary)' }}>{color.name}</h1>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.7', maxWidth: '480px' }}>
              {color.description}
            </p>
          </div>

          {/* Color values */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {valueRows.map(({ label, value }) => (
              <div key={label} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
              }}>
                <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', letterSpacing: '0.1em', width: '36px' }}>{label}</span>
                <span style={{ fontSize: '13px', color: 'var(--text-primary)', fontFamily: 'monospace', flex: 1, paddingLeft: '12px' }}>{value}</span>
                <button
                  onClick={() => handleCopy(value, label)}
                  style={{
                    background: copiedField === label ? 'rgba(201,169,110,0.12)' : 'var(--bg-elevated)',
                    border: `1px solid ${copiedField === label ? 'rgba(201,169,110,0.3)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-sm)',
                    padding: '4px 12px',
                    fontSize: '11px',
                    color: copiedField === label ? 'var(--accent)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    minWidth: '52px',
                  }}
                >
                  {copiedField === label ? 'Copied' : 'Copy'}
                </button>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {color.tags.map(tag => (
              <span
                key={tag}
                onClick={() => navigate(`/search?q=${tag}`)}
                style={{
                  fontSize: '11px',
                  fontWeight: '500',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '4px',
                  padding: '4px 10px',
                  cursor: 'pointer',
                  transition: 'color 0.15s',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* Similar Colors */}
      {similar.length > 0 && (
        <div style={{ marginTop: '64px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '20px' }}>Similar Colors</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
            {similar.map(c => (
              <ColorCard key={c.id} id={c.id} name={c.name} hex={c.hex} tag={c.tags[0]} />
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
