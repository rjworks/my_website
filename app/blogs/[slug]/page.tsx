import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import { getBlog } from '@/lib/blog-store'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlog(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Arjay Andal`,
    description: post.excerpt,
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlog(slug)
  if (!post) notFound()

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
          <article className="px-8 md:px-16 py-16 md:py-24 max-w-2xl">
            <Link
              href="/blogs"
              style={{
                fontSize: '0.8rem',
                color: 'var(--accent)',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block',
                marginBottom: '2rem',
              }}
            >
              ← Back to Blogs
            </Link>

            <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', display: 'block', marginBottom: '0.75rem' }}>
              {formatDate(post.date)}
            </span>

            <h1
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 800,
                color: 'var(--ink)',
                lineHeight: 1.2,
                marginBottom: '1rem',
              }}
            >
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-8">
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

            {post.content.map((paragraph, i) => (
              <p
                key={i}
                style={{
                  fontSize: '1rem',
                  color: 'var(--ink)',
                  lineHeight: 1.85,
                  marginBottom: '1.25rem',
                }}
              >
                {paragraph}
              </p>
            ))}
          </article>
        </main>
      </div>
    </>
  )
}
