import { NextRequest, NextResponse } from 'next/server'
import { deleteBlog, getBlog, updateBlog } from '@/lib/blog-store'

function assertAuthorized(req: NextRequest): NextResponse | null {
  const secret = process.env.BLOG_API_SECRET
  if (!secret) return null
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlog(slug)
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const unauthorized = assertAuthorized(req)
  if (unauthorized) return unauthorized

  const { slug } = await params

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { title, date, tags, excerpt, content } = (body ?? {}) as Record<string, unknown>

  if (content !== undefined && (!Array.isArray(content) || !content.every((p) => typeof p === 'string'))) {
    return NextResponse.json({ error: '`content` must be string[]' }, { status: 400 })
  }
  if (tags !== undefined && (!Array.isArray(tags) || !tags.every((t) => typeof t === 'string'))) {
    return NextResponse.json({ error: '`tags` must be string[]' }, { status: 400 })
  }

  try {
    const updated = await updateBlog(slug, {
      ...(typeof title === 'string' ? { title } : {}),
      ...(typeof date === 'string' ? { date } : {}),
      ...(Array.isArray(tags) ? { tags: tags as string[] } : {}),
      ...(typeof excerpt === 'string' ? { excerpt } : {}),
      ...(Array.isArray(content) ? { content: content as string[] } : {}),
    })
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(updated)
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Failed to update post' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const unauthorized = assertAuthorized(req)
  if (unauthorized) return unauthorized

  const { slug } = await params
  try {
    const ok = await deleteBlog(slug)
    if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Failed to delete post' }, { status: 500 })
  }
}
