import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { colors } from '../data/colors'
import { searchColors } from '../utils/colorUtils'

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

export default function SearchBar({ placeholder = 'Search colors, moods, HEX...', autoFocus = false, onSearch }) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef(null)
  const wrapperRef = useRef(null)
  const navigate = useNavigate()

  const debouncedQuery = useDebounce(query, 120)

  useEffect(() => {
    if (autoFocus && inputRef.current) inputRef.current.focus()
  }, [autoFocus])

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSuggestions([])
      setOpen(false)
      setActiveIndex(-1)
      return
    }
    const results = searchColors(debouncedQuery, colors).slice(0, 6)
    setSuggestions(results)
    setOpen(results.length > 0)
    setActiveIndex(-1)
  }, [debouncedQuery])

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const commitSearch = useCallback((q) => {
    if (!q.trim()) return
    setOpen(false)
    if (onSearch) onSearch(q)
    else navigate(`/search?q=${encodeURIComponent(q.trim())}`)
  }, [onSearch, navigate])

  function handleKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => Math.max(i - 1, -1))
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        setOpen(false)
        setQuery('')
        navigate(`/color/${suggestions[activeIndex].id}`)
      } else {
        commitSearch(query)
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  function handleSelect(color) {
    setOpen(false)
    setQuery('')
    navigate(`/color/${color.id}`)
  }

  function clearQuery() {
    setQuery('')
    setSuggestions([])
    setOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: focused ? 'var(--bg-elevated)' : 'var(--bg-card)',
        border: `1px solid ${focused ? 'var(--border-hover)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-lg)',
        padding: '0 14px',
        height: '40px',
        transition: 'background var(--transition-fast), border-color var(--transition-fast)',
        outline: focused ? '2px solid var(--accent-subtle)' : 'none',
        outlineOffset: '2px',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
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
          autoComplete="off"
          spellCheck="false"
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: '13px',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)',
            minWidth: 0,
          }}
        />
        {query && (
          <button
            onClick={clearQuery}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--text-muted)',
              flexShrink: 0,
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
        {!query && (
          <span style={{
            fontSize: '10px',
            color: 'var(--text-muted)',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xs)',
            padding: '2px 6px',
            flexShrink: 0,
            fontFamily: 'var(--font-mono)',
          }}>
            ↵
          </span>
        )}
      </div>

      {/* Dropdown */}
      {open && suggestions.length > 0 && (
        <div
          className="fade-in"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            zIndex: 300,
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {suggestions.map((color, i) => (
            <div
              key={color.id}
              onClick={() => handleSelect(color)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '9px 14px',
                cursor: 'pointer',
                background: activeIndex === i ? 'var(--bg-hover)' : 'transparent',
                borderBottom: i < suggestions.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                transition: 'background var(--transition-fast)',
              }}
              onMouseEnter={e => { setActiveIndex(i); e.currentTarget.style.background = 'var(--bg-hover)' }}
              onMouseLeave={e => { setActiveIndex(-1); e.currentTarget.style.background = 'transparent' }}
            >
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: 'var(--radius-sm)',
                background: color.hex,
                flexShrink: 0,
                border: '1px solid rgba(255,255,255,0.06)',
              }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', minWidth: 0 }}>
                <span style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: '500' }}>{color.name}</span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{color.hex}</span>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px', flexShrink: 0 }}>
                {color.tags.slice(0, 1).map(tag => (
                  <span key={tag} style={{
                    fontSize: '9px',
                    fontWeight: '600',
                    color: 'var(--text-muted)',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '2px 6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
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
