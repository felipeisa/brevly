import { api } from './api'

export async function deleteLink(shortUrl: string) {
  await api.delete(`/link/${encodeURIComponent(shortUrl)}`)
}
