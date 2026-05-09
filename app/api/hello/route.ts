import { NextRequest, NextResponse } from 'next/server'

const DEFAULT = {
  code: '// Hello, world!\nconsole.log("Hello from the /hello page!");',
  language: 'javascript',
  filename: 'hello.js',
}

let cached = { ...DEFAULT }

export async function GET() {
  return NextResponse.json(cached)
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

  cached = {
    code,
    language: typeof language === 'string' ? language : 'javascript',
    filename: typeof filename === 'string' ? filename : 'hello.js',
  }

  return NextResponse.json({ ok: true })
}
