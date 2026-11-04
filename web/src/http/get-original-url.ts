import axios from 'axios'

interface GetOriginalUrlResponse {
  originalUrl: string
}

export async function getOriginalUrl(shortUrl: string) {
  console.count(`GET originalUrl: ${shortUrl}`)

  const response = await axios.get<GetOriginalUrlResponse>(
    `http://localhost:3333/link/${encodeURIComponent(shortUrl)}`
  )

  console.log(response)

  return response.data
}
