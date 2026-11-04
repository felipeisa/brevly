import { api } from './api'

export interface CreateLinkInput {
  originalUrl: string
  shortUrl: string
}

interface CreateLinkResponse {
  id: string
}

export async function createLink(data: CreateLinkInput) {
  const response = await api.post<CreateLinkResponse>('/link', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return response.data
}
