import { useState } from 'react'
import { mixColors, getContrastColor } from '../../utils/colorMixer'
import { hexToClipboard } from '../../utils/colorUtils'

const PRESET_COLORS = [
  '#c9a96e', '#1a1a2e', '#e8613a', '#0d1b2a', '#7b2fff',
  '#6b9e8f', '#b8a9c9', '#00f5ff', '#cfb53b', '#c0392b',
  '#ace1af', '#4a0e2b', '#0f3460', '#ffbf47', '#e07b6a',
]

function ColorPicker({ value, onChange, label }) {
  const [showPresets, setShowPresets] = useState(false)
  const textColor = getContrastColor(value)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
      <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        {label}
      </span>
      <div
        style={{
          height: '100px',
          borderRadius: 'var(--radius-lg)',
          background: value,
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '10px 12px',
          cursor: 'pointer',
          position: 'relative',
        }}
        onClick={() => setShowPresets(v => !v)}
      >
        <span style={{ fontSize: '12px', fontFamily: 'monospace', color: textColor, fontWeight: '500', opacity: 0.85 }}>
          {value}
        </span>
      </div>

      {showPresets && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '10px',
        }}>
          {PRESET_COLORS.map(hex => (
            <div
              key={hex}
              onClick={() => { onChange(hex); setShowPresets(false) }}
              title={hex}
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '4px',
                background: hex,
                cursor: 'pointer',
                border: hex === value ? '2px solid var(--text-primary)' : '1px solid var(--border)',
                transition: 'transform 0.1s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          ))}
          <input
            type="color"
            value={value}
            onChange={e => onChange(e.target.value)}
            title="Custom color"
            style={{
              width: '24px',
              height: '24px',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              cursor: 'pointer',
              padding: '1px',
              background: 'var(--bg-card)',
            }}
          />
        </div>
      )}
    </div>
  )
}

export default function ColorMixer() {
  const [color1, setColor1] = useState('#c9a96e')
  const [color2, setColor2] = useState('#0d1b2a')
  const [ratio, setRatio] = useState(0.5)
  const [copied, setCopied] = useState(false)

  const mixed = mixColors(color1, color2, ratio)
  const mixedTextColor = getContrastColor(mixed.hex)

  function handleCopy() {
    hexToClipboard(mixed.hex).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      padding: '32px',
      display: 'flex',
      flexDirection: 'column',
      gap: '28px',
    }}>

      {/* Pickers row */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <ColorPicker value={color1} onChange={setColor1} label="Color A" />

        {/* Arrow */}
        <div style={{ display: 'flex', alignItems: 'center', paddingTop: '30px', color: 'var(--text-muted)', flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>

        <ColorPicker value={color2} onChange={setColor2} label="Color B" />
      </div>

      {/* Slider */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Blend</span>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
            {Math.round((1 - ratio) * 100)}% A · {Math.round(ratio * 100)}% B
          </span>
        </div>
        <div style={{ position: 'relative', height: '6px', borderRadius: '3px', background: `linear-gradient(to right, ${color1}, ${color2})`, border: '1px solid var(--border)' }}>
          <input
            type="range"
            min="0"
            max="100"
            value={Math.round(ratio * 100)}
            onChange={e => setRatio(Number(e.target.value) / 100)}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              opacity: 0,
              cursor: 'pointer',
              height: '100%',
              margin: 0,
            }}
          />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: `${ratio * 100}%`,
            transform: 'translate(-50%, -50%)',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: mixed.hex,
            border: '2px solid rgba(255,255,255,0.6)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
            pointerEvents: 'none',
          }} />
        </div>
      </div>

      {/* Result */}
      <div style={{
        borderRadius: 'var(--radius-lg)',
        background: mixed.hex,
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        border: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: mixedTextColor, opacity: 0.6 }}>
            Result
          </span>
          <span style={{ fontSize: '18px', fontFamily: 'monospace', fontWeight: '600', color: mixedTextColor }}>
            {mixed.hex}
          </span>
          <span style={{ fontSize: '11px', color: mixedTextColor, opacity: 0.6 }}>
            rgb({mixed.r}, {mixed.g}, {mixed.b})
          </span>
        </div>
        <button
          onClick={handleCopy}
          style={{
            background: copied ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 'var(--radius-md)',
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: '500',
            color: mixedTextColor,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'background 0.15s',
            flexShrink: 0,
          }}
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              Copy HEX
            </>
          )}
        </button>
      </div>

    </div>
  )
                }
