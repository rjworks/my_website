'use client'

import { useEffect, useState } from 'react'

interface Content {
  code: string
  language: string
  filename: string
}

export default function HelloViewer({ initial }: { initial: Content }) {
  const [code, setCode] = useState(initial.code)

  useEffect(() => {
    const poll = async () => {
      try {
        const res = await fetch('/api/hello')
        const data: Content = await res.json()
        setCode(data.code)
      } catch {}
    }

    poll()
    const interval = setInterval(poll, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[#1e1e1e] p-8">
      <pre
        className="text-[#e1e4e8] text-sm leading-relaxed whitespace-pre-wrap"
        style={{ fontFamily: 'Consolas, "Courier New", monospace' }}
      >
        {code}
      </pre>
    </div>
  )
}