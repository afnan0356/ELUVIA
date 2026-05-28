import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { colors } from '../../data/colors'
import { hexToClipboard } from '../../utils/colorUtils'
import { getContrastColor } from '../../utils/colorMixer'

export default function RandomColor() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(() => colors[Math.floor(Math.random() * colors.length)])
  const [copied, setCopied] = useState(false)
  const [animating, setAnimating] = useState(false)

  function generate() {
    setAnimating(true)
    setTimeout(() => {
      let next
      do { next = colors[Math.floor(Math.random() * colors.length)] }
      while (next.id === current.id)
      setCurrent(next)
      setAnimating(false)
    }, 120)
  }

  function handleCopy() {
    hexToClipboard(current.hex).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  const textColor = getContrastColor(current.hex)

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Preview */}
      <div
        style={{
          background: current.hex,
          height: '180px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '20px 24px',
          transition: 'background 0.3s ease',
          opacity: animating ? 0.6 : 1,
        }}
      >
        <span style={{ fontSize: '20px', fontWeight: '700', color: textColor, lineHeight: 1.2 }}>
          {current.name}
        </span>
        <span style={{ fontSize: '13px', fontFamily: 'monospace', color: textColor, opacity: 0.75, marginTop: '4px' }}>
          {current.hex}
        </span>
      </div>

      {/* Tags */}
      <div style={{ padding: '14px 24px 0', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {current.tags.slice(0, 3).map(tag => (
          <span key={tag} style={{
            fontSize: '10px',
            fontWeight: '500',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '4px',
            padding: '3px 8px',
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div style={{ padding: '16px 24px 24px', display: 'flex', gap: '8px' }}>
        <button
          onClick={generate}
          style={{
            flex: 1,
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 16px',
            fontSize: '12px',
            fontWeight: '500',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'background 0.15s',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
          </svg>
          Regenerate
        </button>

        <button
          onClick={handleCopy}
          style={{
            background: copied ? 'rgba(201,169,110,0.12)' : 'var(--bg-elevated)',
            border: `1px solid ${copied ? 'rgba(201,169,110,0.3)' : 'var(--border)'}`,
            borderRadius: 'var(--radius-md)',
            padding: '10px 14px',
            fontSize: '12px',
            color: copied ? 'var(--accent)' : 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'all 0.15s',
          }}
        >
          {copied ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          )}
          {copied ? 'Copied' : 'Copy'}
        </button>

        <button
          onClick={() => navigate(`/color/${current.id}`)}
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 14px',
            fontSize: '12px',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            transition: 'background 0.15s',
          }}
          title="View detail"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>

    </div>
  )
}
