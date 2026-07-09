import Link from 'next/link'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import { listBlogs } from '@/lib/blog-store'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blogs — Arjay Andal',
  description: 'Writing on software, projects, and things I learn along the way.',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogsPage() {
  const blogs = await listBlogs()
  return (
    <>
      <Navbar />

      <div className="paper-wrapper">
        <main
          className="paper-sheet"
          style={{
            minHeight: '100vh',
            paddingRight: 'clamp(1rem, 4vw, 3.5rem)',
            paddingLeft: '2.5rem',
          }}
        >
          <section className="px-8 md:px-16 py-16 md:py-24">
            <h1 className="section-heading">Blogs</h1>

            <p style={{ color: 'var(--ink-muted)', fontSize: '0.95rem', marginBottom: '2rem', maxWidth: '56ch' }}>
              Notes on software, projects, and things I learn along the way.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
              {blogs.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  style={{
                    display: 'block',
                    border: '1px solid var(--rule-line)',
                    borderRadius: '6px',
                    padding: '1.25rem 1.5rem',
                    background: 'var(--paper)',
                    boxShadow: '0 1px 6px var(--shadow)',
                    textDecoration: 'none',
                    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                  }}
                  className="blog-card"
                >
                  <span style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', display: 'block', marginBottom: '0.5rem' }}>
                    {formatDate(post.date)}
                  </span>

                  <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.5rem', lineHeight: 1.35 }}>
                    {post.title}
                  </h2>

                  <p style={{ fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.7, marginBottom: '1rem' }}>
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: '0.65rem',
                          padding: '0.15rem 0.5rem',
                          border: '1px solid var(--rule-line)',
                          borderRadius: '999px',
                          color: 'var(--ink-muted)',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <span style={{ fontSize: '0.82rem', color: 'var(--accent)', fontWeight: 600 }}>
                    Read more →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
