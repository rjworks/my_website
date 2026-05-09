import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { broadcast } from '@/lib/sse-broadcast'

const DATA_FILE = '/tmp/hello-content.json'

const DEFAULT = {
  code: '// Hello, world!\nconsole.log("Hello from the /hello page!");',
  language: 'javascript',
  filename: 'hello.js',
}

async function readContent() {
  try {
    const raw = await readFile(DATA_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return DEFAULT
  }
}

export async function GET() {
  const content = await readContent()
  return NextResponse.json(content)
}

export async function POST(req: NextRequest) {
  const secret = process.env.HELLO_API_SECRET
  if (secret) {
    const auth = req.headers.get('authorization')
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { code, language, filename } = (body ?? {}) as Record<string, unknown>

  if (typeof code !== 'string') {
    return NextResponse.json({ error: '`code` (string) is required' }, { status: 400 })
  }

  const content = {
    code,
    language: typeof language === 'string' ? language : 'javascript',
    filename: typeof filename === 'string' ? filename : 'hello.js',
  }

  await mkdir(path.dirname(DATA_FILE), { recursive: true })
  await writeFile(DATA_FILE, JSON.stringify(content, null, 2), 'utf-8')
  broadcast(content)

  return NextResponse.json({ ok: true })
}
