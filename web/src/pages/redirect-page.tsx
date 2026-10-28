import { useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import { getOriginalUrl } from '../http/get-original-url'

export function RedirectPage() {
  const { shortUrl } = useParams<{ shortUrl: string }>()
  const requestedShortUrl = useRef<string | null>(null)

  useEffect(() => {
    if (!shortUrl || requestedShortUrl.current === shortUrl) return

    requestedShortUrl.current = shortUrl

    async function redirect() {
      const result = await getOriginalUrl(shortUrl as string)
      console.log(result)
    }
    redirect()
  }, [shortUrl])

  return (
    <div>
      <h1>Redirecionamento...</h1>
      <p>Link Encurtado: {shortUrl}</p>
    </div>
  )
}
