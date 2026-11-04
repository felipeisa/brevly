import { api } from './api'

interface GetOriginalUrlResponse {
  originalUrl: string
}

export async function getOriginalUrl(shortUrl: string) {
  const response = await api.get<GetOriginalUrlResponse>(
    `/link/${encodeURIComponent(shortUrl)}`
  )

  return response.data
}
