import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { hexToClipboard } from '../../utils/colorUtils'

export default function ColorCard({ id, name = 'Color Name', hex = '#A0B4C8', tag }) {
  const [copied, setCopied] = useState(false)
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()
  const displayTag = tag || 'color'

  const handleCopy = useCallback((e) => {
    e.stopPropagation()
    hexToClipboard(hex).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    })
  }, [hex])

  const handleClick = useCallback(() => {
    if (id) navigate(`/color/${id}`)
  }, [id, navigate])

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${hovered ? 'var(--border-hover)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? 'var(--shadow-md)' : 'none',
        transition: 'transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base)',
        willChange: 'transform',
      }}
    >
      {/* Color block */}
      <div style={{
        height: '112px',
        background: hex,
        width: '100%',
        transition: 'height var(--transition-base)',
      }} />

      {/* Body */}
      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
            <span style={{
              fontSize: '13px',
              fontWeight: '500',
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {name}
            </span>
            <span style={{
              fontSize: '11px',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.04em',
            }}>
              {hex}
            </span>
          </div>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            title={copied ? 'Copied!' : 'Copy HEX'}
            style={{
              flexShrink: 0,
              background: copied ? 'var(--accent-subtle)' : 'var(--bg-elevated)',
              border: `1px solid ${copied ? 'rgba(201,169,110,0.25)' : 'var(--border)'}`,
              borderRadius: 'var(--radius-sm)',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background var(--transition-fast), border-color var(--transition-fast)',
            }}
          >
            {copied ? (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            )}
          </button>
        </div>

        {/* Tag */}
        <span style={{
          display: 'inline-block',
          fontSize: '9px',
          fontWeight: '600',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xs)',
          padding: '3px 7px',
          width: 'fit-content',
        }}>
          {displayTag}
        </span>
      </div>
    </div>
  )
}
