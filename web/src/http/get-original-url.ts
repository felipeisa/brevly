import axios from 'axios'

interface GetOriginalUrlResponse {
  originalUrl: string
}

export async function getOriginalUrl(shortUrl: string) {
  const response = await axios.get<GetOriginalUrlResponse>(
    `http://localhost:3333/link/${encodeURIComponent(shortUrl)}`
  )

  return response.data
}
