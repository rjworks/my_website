import { NextRequest, NextResponse } from 'next/server'
import { createBlog, listBlogs } from '@/lib/blog-store'

function assertAuthorized(req: NextRequest): NextResponse | null {
  const secret = process.env.BLOG_API_SECRET
  if (!secret) return null
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}

export async function GET() {
  const posts = await listBlogs()
  return NextResponse.json(posts)
}

export async function POST(req: NextRequest) {
  const unauthorized = assertAuthorized(req)
  if (unauthorized) return unauthorized

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { title, slug, date, tags, excerpt, content } = (body ?? {}) as Record<string, unknown>

  if (typeof title !== 'string' || !title.trim()) {
    return NextResponse.json({ error: '`title` (string) is required' }, { status: 400 })
  }
  if (typeof excerpt !== 'string' || !excerpt.trim()) {
    return NextResponse.json({ error: '`excerpt` (string) is required' }, { status: 400 })
  }
  if (!Array.isArray(content) || !content.every((p) => typeof p === 'string')) {
    return NextResponse.json({ error: '`content` (string[]) is required' }, { status: 400 })
  }

  try {
    const post = await createBlog({
      title,
      slug: typeof slug === 'string' ? slug : undefined,
      date: typeof date === 'string' ? date : undefined,
      tags: Array.isArray(tags) ? tags.filter((t): t is string => typeof t === 'string') : undefined,
      excerpt,
      content,
    })
    return NextResponse.json(post, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Failed to create post' }, { status: 500 })
  }
}
