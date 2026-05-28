import { useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { colors } from '../data/colors'
import { getColorById, getSimilarColors, hexToClipboard } from '../utils/colorUtils'
import { getContrastColor, rgbToHsl } from '../utils/colorMixer'
import ColorCard from '../components/ui/ColorCard'

export default function ColorDetailPage() {
  const { name } = useParams()
  const navigate = useNavigate()
  const [copiedField, setCopiedField] = useState(null)

  const color = getColorById(name, colors)

  const handleCopy = useCallback((value, field) => {
    hexToClipboard(value).then(() => {
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 1400)
    })
  }, [])

  if (!color) {
    return (
      <div style={{
        maxWidth: '480px',
        margin: '80px auto',
        padding: 'var(--space-6)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-4)',
        textAlign: 'center',
      }}>
        <div style={{
          width: '56px', height: '56px',
          borderRadius: '50%',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <h1 style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)' }}>Color not found</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>This color doesn't exist in our database.</p>
        </div>
        <button onClick={() => navigate('/search')} style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '10px 22px',
          fontSize: '13px',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          fontFamily: 'var(--font-sans)',
        }}>
          Browse all colors
        </button>
      </div>
    )
  }

  const similar = getSimilarColors(color, colors, 6)
  const rgbStr = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`
  const hslStr = `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`
  const textOnColor = getContrastColor(color.hex)

  const valueRows = [
    { label: 'HEX', value: color.hex, mono: true },
    { label: 'RGB', value: rgbStr, mono: true },
    { label: 'HSL', value: hslStr, mono: true },
  ]

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'var(--space-10) var(--space-6) var(--space-16)' }}>

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-muted)',
          fontSize: '13px',
          marginBottom: 'var(--space-10)',
          padding: 0,
          fontFamily: 'var(--font-sans)',
          transition: 'color var(--transition-fast)',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
        </svg>
        Back
      </button>

      {/* Main layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'var(--space-12)', alignItems: 'start', flexWrap: 'wrap' }}>

        {/* Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <div style={{
            width: '280px',
            height: '280px',
            borderRadius: 'var(--radius-xl)',
            background: color.hex,
            border: '1px solid var(--border)',
            boxShadow: `0 24px 64px ${color.hex}28`,
            display: 'flex',
            alignItems: 'flex-end',
            padding: 'var(--space-4)',
          }}>
            <button
              onClick={() => handleCopy(color.hex, 'preview')}
              style={{
                background: copiedField === 'preview' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 'var(--radius-sm)',
                padding: '5px 10px',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                color: textOnColor,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'background var(--transition-fast)',
                opacity: 0.85,
              }}
            >
              {copiedField === 'preview' ? '✓ Copied' : color.hex}
            </button>
          </div>
        </div>

        {/* Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', minWidth: 0 }}>

          {/* Title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <h1 style={{ fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              {color.name}
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.75', maxWidth: '440px' }}>
              {color.description}
            </p>
          </div>

          {/* Values */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {valueRows.map(({ label, value }) => (
              <div key={label} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '11px 14px',
                transition: 'border-color var(--transition-fast)',
              }}>
                <span style={{
                  fontSize: '10px',
                  fontWeight: '700',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  width: '32px',
                  flexShrink: 0,
                }}>
                  {label}
                </span>
                <span style={{
                  fontSize: '13px',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {value}
                </span>
                <button
                  onClick={() => handleCopy(value, label)}
                  style={{
                    flexShrink: 0,
                    background: copiedField === label ? 'var(--accent-subtle)' : 'var(--bg-elevated)',
                    border: `1px solid ${copiedField === label ? 'rgba(201,169,110,0.2)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-sm)',
                    padding: '4px 12px',
                    fontSize: '11px',
                    fontWeight: '500',
                    color: copiedField === label ? 'var(--accent)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    minWidth: '54px',
                    textAlign: 'center',
                    transition: 'all var(--transition-fast)',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {copiedField === label ? '✓ Done' : 'Copy'}
                </button>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            {color.tags.map(tag => (
              <button
                key={tag}
                onClick={() => navigate(`/search?q=${tag}`)}
                style={{
                  fontSize: '10px',
                  fontWeight: '600',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '4px 10px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  transition: 'color var(--transition-fast), border-color var(--transition-fast)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--text-secondary)'
                  e.currentTarget.style.borderColor = 'var(--border)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--text-muted)'
                  e.currentTarget.style.borderColor = 'var(--border-subtle)'
                }}
              >
                {tag}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Similar Colors */}
      {similar.length > 0 && (
        <div style={{ marginTop: 'var(--space-16)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>Similar Colors</h2>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Colors with shared mood or tone</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(175px, 1fr))', gap: 'var(--space-4)' }}>
            {similar.map(c => (
              <ColorCard key={c.id} id={c.id} name={c.name} hex={c.hex} tag={c.tags[0]} />
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .detail-grid {
            grid-template-columns: 1fr !important;
          }
          .detail-grid > div:first-child > div:first-child {
            width: 100% !important;
            height: 200px !important;
          }
        }
      `}</style>
    </div>
  )
}
