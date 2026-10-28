import axios from 'axios'
import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getOriginalUrl } from '../http/get-original-url'

export function RedirectPage() {
  const { shortUrl } = useParams<{ shortUrl: string }>()
  const requestedShortUrl = useRef<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!shortUrl || requestedShortUrl.current === shortUrl) return

    requestedShortUrl.current = shortUrl
    const currentShortUrl = shortUrl

    async function redirect() {
      try {
        const result = await getOriginalUrl(currentShortUrl)
        window.location.replace(result.originalUrl)
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          navigate('/404', { replace: true })
        } else {
          console.error('Erro ao redirecionar:', error)
        }
      }
    }
    redirect()
  }, [shortUrl, navigate])

  return (
    <div>
      <h1>Redirecionamento...</h1>
      <p>Link Encurtado: {shortUrl}</p>
    </div>
  )
}
