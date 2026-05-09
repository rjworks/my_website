'use client'

import { useEffect, useRef, useState } from 'react'

interface Content {
  code: string
  language: string
  filename: string
}

export default function HelloViewer({ initial }: { initial: Content }) {
  const [code, setCode] = useState(initial.code)
  const containerRef = useRef<HTMLDivElement>(null)
  const preRef = useRef<HTMLPreElement>(null)

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

  useEffect(() => {
    const pre = preRef.current
    const container = containerRef.current
    if (!pre || !container) return

    let lo = 1
    let hi = 300
    while (lo < hi) {
      const mid = Math.floor((lo + hi + 1) / 2)
      pre.style.fontSize = `${mid}px`
      if (pre.scrollWidth <= container.clientWidth && pre.scrollHeight <= container.clientHeight) {
        lo = mid
      } else {
        hi = mid - 1
      }
    }
    pre.style.fontSize = `${lo}px`
  }, [code])

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen bg-[#1e1e1e] p-4 overflow-hidden"
    >
      <pre
        ref={preRef}
        className="text-[#e1e4e8] leading-snug whitespace-pre-wrap"
        style={{ fontFamily: 'Consolas, "Courier New", monospace' }}
      >
        {code}
      </pre>
    </div>
  )
}
