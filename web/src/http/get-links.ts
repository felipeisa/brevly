import axios from 'axios'

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
  const response = await axios.get<GetLinksResponse>(
    'http://localhost:3333/link'
  )

  console.log(response)
  return response.data
}
