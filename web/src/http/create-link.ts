import axios from 'axios'

export interface CreateLinkInput {
  originalUrl: string
  shortUrl: string
}

interface CreateLinkResponse {
  id: string
}

export async function createLink(data: CreateLinkInput) {
  const response = await axios.post<CreateLinkResponse>(
    'http://localhost:3333/link',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  return response.data
}
