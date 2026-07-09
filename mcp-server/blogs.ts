#!/usr/bin/env node
/**
 * MCP server that lets an agent manage the blog posts on this site.
 * Talks to the site's /api/blogs REST endpoints (same Bearer-secret
 * auth pattern as /api/hello), so it works against a local dev server
 * or the deployed site — no direct database credentials required.
 */
import 'dotenv/config'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'

const API_URL = (process.env.BLOG_API_URL ?? 'http://localhost:3000').replace(/\/+$/, '')
const API_SECRET = process.env.BLOG_API_SECRET

interface BlogPost {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  content: string[]
}

function authHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (API_SECRET) headers.Authorization = `Bearer ${API_SECRET}`
  return headers
}

async function apiRequest(path: string, init?: RequestInit) {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { ...authHeaders(), ...(init?.headers ?? {}) },
  })
  const text = await res.text()
  const body = text ? JSON.parse(text) : null
  if (!res.ok) {
    const message = (body && (body as { error?: string }).error) || res.statusText
    throw new Error(`${res.status} ${message}`)
  }
  return body
}

function textResult(value: unknown) {
  return { content: [{ type: 'text' as const, text: JSON.stringify(value, null, 2) }] }
}

function errorResult(err: unknown) {
  return {
    content: [{ type: 'text' as const, text: err instanceof Error ? err.message : String(err) }],
    isError: true,
  }
}

const server = new McpServer({ name: 'blog-manager', version: '1.0.0' })

server.registerTool(
  'list_blogs',
  {
    title: 'List blog posts',
    description: 'List all blog posts on the site (slug, title, date, tags, excerpt).',
    inputSchema: {},
  },
  async () => {
    try {
      const posts = (await apiRequest('/api/blogs')) as BlogPost[]
      return textResult(posts.map(({ slug, title, date, tags, excerpt }) => ({ slug, title, date, tags, excerpt })))
    } catch (err) {
      return errorResult(err)
    }
  }
)

server.registerTool(
  'get_blog',
  {
    title: 'Get a blog post',
    description: 'Get the full content of a single blog post by slug.',
    inputSchema: { slug: z.string().describe('The blog post slug') },
  },
  async ({ slug }) => {
    try {
      const post = await apiRequest(`/api/blogs/${encodeURIComponent(slug)}`)
      return textResult(post)
    } catch (err) {
      return errorResult(err)
    }
  }
)

server.registerTool(
  'create_blog',
  {
    title: 'Create a blog post',
    description: 'Create a new blog post. Slug is derived from the title if not given.',
    inputSchema: {
      title: z.string().describe('Post title'),
      slug: z.string().optional().describe('URL slug; derived from title if omitted'),
      date: z.string().optional().describe('ISO date (YYYY-MM-DD); defaults to today'),
      tags: z.array(z.string()).optional().describe('Topic tags'),
      excerpt: z.string().describe('Short summary shown on the blog list card'),
      content: z.array(z.string()).describe('Post body as an array of paragraphs'),
    },
  },
  async (input) => {
    try {
      const post = await apiRequest('/api/blogs', { method: 'POST', body: JSON.stringify(input) })
      return textResult(post)
    } catch (err) {
      return errorResult(err)
    }
  }
)

server.registerTool(
  'update_blog',
  {
    title: 'Update a blog post',
    description: 'Update fields of an existing blog post by slug. Only given fields are changed.',
    inputSchema: {
      slug: z.string().describe('The blog post slug to update'),
      title: z.string().optional(),
      date: z.string().optional().describe('ISO date (YYYY-MM-DD)'),
      tags: z.array(z.string()).optional(),
      excerpt: z.string().optional(),
      content: z.array(z.string()).optional().describe('Post body as an array of paragraphs'),
    },
  },
  async ({ slug, ...patch }) => {
    try {
      const post = await apiRequest(`/api/blogs/${encodeURIComponent(slug)}`, {
        method: 'PATCH',
        body: JSON.stringify(patch),
      })
      return textResult(post)
    } catch (err) {
      return errorResult(err)
    }
  }
)

server.registerTool(
  'delete_blog',
  {
    title: 'Delete a blog post',
    description: 'Permanently delete a blog post by slug.',
    inputSchema: { slug: z.string().describe('The blog post slug to delete') },
  },
  async ({ slug }) => {
    try {
      const result = await apiRequest(`/api/blogs/${encodeURIComponent(slug)}`, { method: 'DELETE' })
      return textResult(result)
    } catch (err) {
      return errorResult(err)
    }
  }
)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
