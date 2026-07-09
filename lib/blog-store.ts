import { kv } from '@vercel/kv'
import { blogs as seedBlogs, type BlogPost } from '@/data/blogs'

export type { BlogPost }

const BLOGS_KEY = 'blog-posts'

export async function listBlogs(): Promise<BlogPost[]> {
  try {
    const stored = await kv.get<BlogPost[]>(BLOGS_KEY)
    return stored ?? seedBlogs
  } catch {
    return seedBlogs
  }
}

export async function getBlog(slug: string): Promise<BlogPost | undefined> {
  const all = await listBlogs()
  return all.find((post) => post.slug === slug)
}

async function saveBlogs(posts: BlogPost[]): Promise<void> {
  await kv.set(BLOGS_KEY, posts)
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function createBlog(input: {
  title: string
  slug?: string
  date?: string
  tags?: string[]
  excerpt: string
  content: string[]
}): Promise<BlogPost> {
  const all = await listBlogs()
  const baseSlug = input.slug?.trim() || slugify(input.title)
  let slug = baseSlug
  let n = 2
  while (all.some((post) => post.slug === slug)) {
    slug = `${baseSlug}-${n}`
    n += 1
  }

  const post: BlogPost = {
    slug,
    title: input.title,
    date: input.date ?? new Date().toISOString().slice(0, 10),
    tags: input.tags ?? [],
    excerpt: input.excerpt,
    content: input.content,
  }

  await saveBlogs([post, ...all])
  return post
}

export async function updateBlog(
  slug: string,
  patch: Partial<Pick<BlogPost, 'title' | 'date' | 'tags' | 'excerpt' | 'content'>>
): Promise<BlogPost | undefined> {
  const all = await listBlogs()
  const idx = all.findIndex((post) => post.slug === slug)
  if (idx === -1) return undefined

  const updated: BlogPost = { ...all[idx], ...patch }
  const next = all.map((post, i) => (i === idx ? updated : post))
  await saveBlogs(next)
  return updated
}

export async function deleteBlog(slug: string): Promise<boolean> {
  const all = await listBlogs()
  const next = all.filter((post) => post.slug !== slug)
  if (next.length === all.length) return false
  await saveBlogs(next)
  return true
}
