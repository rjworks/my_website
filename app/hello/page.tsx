import { readFile } from 'fs/promises'
import HelloViewer from './HelloViewer'

const DATA_FILE = '/tmp/hello-content.json'

const DEFAULT = {
  code: '// Hello, world!\nconsole.log("Hello from the /hello page!");',
  language: 'javascript',
  filename: 'hello.js',
}

async function getContent() {
  try {
    const raw = await readFile(DATA_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return DEFAULT
  }
}

export default async function HelloPage() {
  const content = await getContent()
  return <HelloViewer initial={content} />
}
