import { useNavigate } from 'react-router-dom'

export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: 'var(--space-16) var(--space-6)' }}>

      <div style={{ marginBottom: 'var(--space-12)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)' }}>
          About
        </span>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
          What is ELUVIA?
        </h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.8' }}>
        <p>
          ELUVIA is a premium color discovery platform built for designers, creators, and anyone
          who thinks carefully about color. It is completely free, requires no account, and runs
          entirely in the browser with no backend.
        </p>
        <p>
          Every color in the database is hand-curated with a name, mood, description, and tags
          that help you find not just a hex code — but a feeling.
        </p>
        <p>
          ELUVIA was built with React, Vite, and Tailwind CSS. It is hosted on GitHub Pages
          and designed to stay fast, lightweight, and permanent.
        </p>

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-8)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-5)',
        }}>
          {[
            { label: 'No login required', desc: 'Everything is public and open.' },
            { label: 'No backend', desc: 'Static, fast, and always available.' },
            { label: 'No ads', desc: 'Clean experience, no distractions.' },
            { label: 'Free forever', desc: 'Built as a public creative tool.' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
              <div style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: 'var(--accent)', marginTop: '8px', flexShrink: 0,
              }} />
              <div>
                <span style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '14px' }}>{item.label}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}> — {item.desc}</span>
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Built with assistance from Claude and ChatGPT.
        </p>
      </div>

      <button
        onClick={() => navigate('/search')}
        style={{
          marginTop: 'var(--space-10)',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '11px 24px',
          fontSize: '13px',
          fontWeight: '500',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          fontFamily: 'var(--font-sans)',
          transition: 'border-color var(--transition-fast)',
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
      >
        Explore Colors →
      </button>
    </div>
  )
          }
