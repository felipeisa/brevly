import axios from 'axios'

export async function deleteLink(shortUrl: string) {
  await axios.delete(
    `http://localhost:3333/link/${encodeURIComponent(shortUrl)}`
  )
}
