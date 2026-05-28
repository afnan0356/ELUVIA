import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SearchBar from '../SearchBar'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    let ticking = false
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 200,
      background: scrolled
        ? 'rgba(10,10,10,0.92)'
        : 'rgba(10,10,10,0.75)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'var(--border-subtle)'}`,
      transition: 'background var(--transition-base), border-color var(--transition-base)',
    }}>
      <nav style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 var(--space-6)',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-4)',
      }}>

        {/* Logo */}
        <Link to="/" style={{
          fontSize: '17px',
          fontWeight: '700',
          color: 'var(--text-primary)',
          letterSpacing: '0.1em',
          flexShrink: 0,
          transition: 'color var(--transition-fast)',
        }}>
          ELUVIA
        </Link>

        {/* Search — hidden on small screens */}
        <div style={{ flex: 1, maxWidth: '440px', display: 'flex' }} className="nav-search">
          <SearchBar />
        </div>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)', flexShrink: 0 }}>
          <Link
            to="/search"
            style={{
              fontSize: '13px',
              color: 'var(--text-secondary)',
              letterSpacing: '0.02em',
              transition: 'color var(--transition-fast)',
              padding: '4px 0',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            Explore
          </Link>

          {/* Mobile menu button */}
          <div ref={menuRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Menu"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: 'var(--radius-sm)',
                background: menuOpen ? 'var(--bg-elevated)' : 'transparent',
                border: `1px solid ${menuOpen ? 'var(--border)' : 'transparent'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                transition: 'background var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast)',
              }}
              onMouseEnter={e => {
                if (!menuOpen) {
                  e.currentTarget.style.background = 'var(--bg-elevated)'
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.color = 'var(--text-primary)'
                }
              }}
              onMouseLeave={e => {
                if (!menuOpen) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = 'transparent'
                  e.currentTarget.style.color = 'var(--text-secondary)'
                }
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>

            {menuOpen && (
              <div
                className="fade-in"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: '200px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                {[
                  { to: '/', label: 'Home' },
                  { to: '/search', label: 'Explore' },
                  { to: '/about', label: 'About' },
                  { to: '/contact', label: 'Contact' },
                ].map((item, i, arr) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    style={{
                      display: 'block',
                      padding: '12px 16px',
                      fontSize: '13px',
                      color: location.pathname === item.to ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontWeight: location.pathname === item.to ? '500' : '400',
                      borderBottom: i < arr.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                      transition: 'background var(--transition-fast), color var(--transition-fast)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'var(--bg-hover)'
                      e.currentTarget.style.color = 'var(--text-primary)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = location.pathname === item.to ? 'var(--text-primary)' : 'var(--text-secondary)'
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile search bar below nav */}
      <div style={{
        display: 'none',
        padding: '0 var(--space-4) var(--space-3)',
      }} className="nav-search-mobile">
        <SearchBar />
      </div>

      <style>{`
        @media (max-width: 640px) {
          .nav-search { display: none !important; }
          .nav-search-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
