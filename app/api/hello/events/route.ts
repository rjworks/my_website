import { NextRequest } from 'next/server'
import { addClient } from '@/lib/sse-broadcast'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder()
  let remove: () => void

  const stream = new ReadableStream({
    start(controller) {
      const send = (data: string) => {
        try {
          controller.enqueue(encoder.encode(`data: ${data}\n\n`))
        } catch {
          remove?.()
        }
      }

      remove = addClient(send)

      req.signal.addEventListener('abort', () => {
        remove?.()
        controller.close()
      })
    },
    cancel() {
      remove?.()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
