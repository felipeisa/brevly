import { api } from './api'

interface Link {
  id: string
  originalUrl: string
  shortUrl: string
  accessCount: number
  createdAt: string
}

interface GetLinksResponse {
  links: Link[]
  total: number
}

export async function getLinks() {
  const response = await api.get<GetLinksResponse>('/link')

  return response.data
}
