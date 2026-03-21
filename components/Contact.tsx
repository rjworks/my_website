'use client'

import { useState } from 'react'
import { siteConfig } from '@/config/site'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.65rem 0.85rem',
    background: 'transparent',
    border: '1px solid var(--rule-line)',
    borderRadius: '4px',
    color: 'var(--ink)',
    fontSize: '0.92rem',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  }

  return (
    <section id="contact" className="px-8 md:px-16 py-16 md:py-24 pb-32">
      <h2 className="section-heading">Contact</h2>

      <div className="max-w-lg">
        {/* Contact info */}
        <div className="flex flex-col gap-1 mb-8">
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)' }}>
            ✉️&nbsp;
            <a
              href={`mailto:${siteConfig.email}`}
              style={{ color: 'var(--accent)', textDecoration: 'underline' }}
            >
              {siteConfig.email}
            </a>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-4">
          <div>
            <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', display: 'block', marginBottom: '0.35rem' }}>
              Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Your name"
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--rule-line)')}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', display: 'block', marginBottom: '0.35rem' }}>
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="your@email.com"
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--rule-line)')}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-muted)', display: 'block', marginBottom: '0.35rem' }}>
              Message
            </label>
            <textarea
              rows={5}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              placeholder="Say hello..."
              style={{ ...inputStyle, resize: 'vertical' }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--rule-line)')}
            />
          </div>

          <button
            type="submit"
            style={{
              alignSelf: 'flex-start',
              padding: '0.6rem 1.5rem',
              backgroundColor: 'var(--accent)',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}
