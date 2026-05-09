import HelloViewer from './HelloViewer'

const DEFAULT = {
  code: '// Hello, world!\nconsole.log("Hello from the /hello page!");',
  language: 'javascript',
  filename: 'hello.js',
}

export default function HelloPage() {
  return <HelloViewer initial={DEFAULT} />
}
