'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'

const tabs = [
  { id: 'hero',       label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects' },
  { id: 'education',  label: 'Education' },
  { id: 'skills',     label: 'Skills' },
  { id: 'blogs',      label: 'Blogs' },
]

export default function Navbar() {
  const [active, setActive] = useState('hero')
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const onHome = pathname === '/'

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!onHome) return
    const observers: IntersectionObserver[] = []
    tabs.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        // Fire when the section crosses the middle band of the viewport.
        // This ensures whichever section occupies the centre is highlighted,
        // regardless of section height.
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [onHome])

  const goTo = (id: string) => {
    if (onHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push(id === 'hero' ? '/' : `/#${id}`)
    }
  }

  const isActive = (id: string) => (pathname.startsWith('/blogs') ? id === 'blogs' : onHome && active === id)

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <>
      {/* ── Desktop: binder tabs anchored to paper's right edge ── */}
      <nav className="fixed top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-end gap-1" style={{ right: 'max(0px, calc(50% - 430px))' }}>
        {tabs.map(({ id, label }) => {
          const tabActive = isActive(id)
          return (
            <button
              key={id}
              onClick={() => goTo(id)}
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(180deg)',
                backgroundColor: tabActive ? 'var(--accent)' : 'var(--tab-bg)',
                color: tabActive ? '#fff' : 'var(--ink-muted)',
                borderLeft: `3px solid ${tabActive ? 'var(--margin-line)' : 'var(--rule-line)'}`,
                boxShadow: tabActive ? '-2px 2px 8px var(--shadow)' : '-1px 1px 4px var(--shadow)',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                padding: '0.75rem 0.5rem',
                fontSize: '0.7rem',
                fontWeight: tabActive ? 700 : 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: '0 4px 4px 0',
                width: '2rem',
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </button>
          )
        })}

        {/* Dark mode toggle */}
        <button
          onClick={toggleTheme}
          title="Toggle theme"
          style={{
            marginTop: '0.5rem',
            backgroundColor: 'var(--tab-bg)',
            color: 'var(--ink-muted)',
            border: '1px solid var(--rule-line)',
            borderRadius: '50%',
            width: '2rem',
            height: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1rem',
            boxShadow: '-1px 1px 4px var(--shadow)',
            transition: 'all 0.2s ease',
            marginRight: '0.25rem',
          }}
        >
          {mounted ? (theme === 'dark' ? '☀️' : '🌙') : '🌙'}
        </button>
      </nav>

      {/* ── Mobile: top bar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex md:hidden items-center justify-between px-3 py-2"
        style={{
          backgroundColor: 'var(--tab-bg)',
          borderBottom: '1px solid var(--rule-line)',
          boxShadow: '0 1px 6px var(--shadow)',
        }}
      >
        <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.85rem' }}>
          Arjay Andal
        </span>
        <div className="flex items-center gap-1 overflow-x-auto">
          {tabs.map(({ id, label }) => {
            const tabActive = isActive(id)
            return (
              <button
                key={id}
                onClick={() => goTo(id)}
                style={{
                  padding: '0.2rem 0.5rem',
                  fontSize: '0.65rem',
                  fontWeight: tabActive ? 700 : 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: tabActive ? 'var(--accent)' : 'var(--ink-muted)',
                  borderBottom: tabActive ? '2px solid var(--accent)' : '2px solid transparent',
                  background: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                }}
              >
                {label}
              </button>
            )
          })}
          <button
            onClick={toggleTheme}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', padding: '0 0.25rem' }}
          >
            {mounted ? (theme === 'dark' ? '☀️' : '🌙') : '🌙'}
          </button>
        </div>
      </nav>
    </>
  )
}
