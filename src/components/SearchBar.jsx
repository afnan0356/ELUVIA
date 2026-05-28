import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { colors } from '../data/colors'
import { searchColors } from '../utils/colorUtils'

export default function SearchBar({ placeholder = 'Search colors, moods, HEX...', autoFocus = false, onSearch }) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)
  const wrapperRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (autoFocus && inputRef.current) inputRef.current.focus()
  }, [autoFocus])

  useEffect(() => {
    if (query.trim().length === 0) {
      setSuggestions([])
      setOpen(false)
      return
    }
    const results = searchColors(query, colors).slice(0, 6)
    setSuggestions(results)
    setOpen(results.length > 0)
  }, [query])

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleKeyDown(e) {
    if (e.key === 'Enter' && query.trim()) {
      setOpen(false)
      if (onSearch) {
        onSearch(query)
      } else {
        navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      }
    }
    if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  function handleSelect(color) {
    setOpen(false)
    setQuery('')
    navigate(`/color/${color.id}`)
  }

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: 'var(--bg-card)',
        border: `1px solid ${focused ? 'var(--border)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-lg)',
        padding: '12px 18px',
        transition: 'border-color 0.15s',
        outline: focused ? '2px solid rgba(201,169,110,0.15)' : 'none',
        outlineOffset: '2px',
      }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            color: 'var(--text-primary)',
            fontFamily: 'inherit',
          }}
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setSuggestions([]); setOpen(false) }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              color: 'var(--text-muted)',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '4px', padding: '2px 7px', flexShrink: 0 }}>
          ↵
        </span>
      </div>

      {/* Suggestions dropdown */}
      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          left: 0,
          right: 0,
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          zIndex: 200,
          boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
        }}>
          {suggestions.map((color, i) => (
            <div
              key={color.id}
              onClick={() => handleSelect(color)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 16px',
                cursor: 'pointer',
                borderBottom: i < suggestions.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: 'var(--radius-sm)',
                background: color.hex,
                flexShrink: 0,
                border: '1px solid rgba(255,255,255,0.07)',
              }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: '500' }}>{color.name}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{color.hex}</span>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px' }}>
                {color.tags.slice(0, 2).map(tag => (
                  <span key={tag} style={{
                    fontSize: '10px',
                    color: 'var(--text-muted)',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '3px',
                    padding: '2px 6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
              }
