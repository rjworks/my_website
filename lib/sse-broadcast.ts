type Sender = (data: string) => void

const clients = new Set<Sender>()

export function addClient(send: Sender) {
  clients.add(send)
  return () => clients.delete(send)
}

export function broadcast(data: object) {
  const payload = JSON.stringify(data)
  clients.forEach(send => send(payload))
}
