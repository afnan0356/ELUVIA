import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { hexToClipboard } from '../../utils/colorUtils'

export default function ColorCard({ id, name = 'Color Name', hex = '#A0B4C8', tag }) {
  const [copied, setCopied] = useState(false)
  const navigate = useNavigate()
  const displayTag = tag || 'color'

  function handleCopy(e) {
    e.stopPropagation()
    hexToClipboard(hex).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  function handleClick() {
    if (id) navigate(`/color/${id}`)
  }

  return (
    <div
      onClick={handleClick}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.4)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{ height: '120px', background: hex, width: '100%' }} />

      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>{name}</span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{hex}</span>
          </div>
          <button
            onClick={handleCopy}
            title="Copy HEX"
            style={{
              background: copied ? 'rgba(201,169,110,0.12)' : 'var(--bg-elevated)',
              border: `1px solid ${copied ? 'rgba(201,169,110,0.3)' : 'var(--border)'}`,
              borderRadius: 'var(--radius-sm)',
              padding: '5px 8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'background 0.15s, border-color 0.15s',
            }}
          >
            {copied ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            )}
          </button>
        </div>

        <span style={{
          display: 'inline-block',
          fontSize: '10px',
          fontWeight: '500',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '4px',
          padding: '3px 7px',
          width: 'fit-content',
        }}>
          {displayTag}
        </span>
      </div>
    </div>
  )
}
