import { kv } from '@vercel/kv'
import HelloViewer from './HelloViewer'

const HELLO_KEY = 'hello-content'

const DEFAULT = {
  code: '// Hello, world!\nconsole.log("Hello from the /hello page!");',
  language: 'javascript',
  filename: 'hello.js',
}

async function getContent() {
  try {
    const content = await kv.get<{ code: string; language: string; filename: string }>(HELLO_KEY)
    return content ?? DEFAULT
  } catch {
    return DEFAULT
  }
}

export default async function HelloPage() {
  const content = await getContent()
  return <HelloViewer initial={content} />
}
