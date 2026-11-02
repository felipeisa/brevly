import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import logo_icon from '../assets/logo_icon.svg'
import { getOriginalUrl } from '../http/get-original-url'

export function RedirectPage() {
  const { shortUrl } = useParams<{ shortUrl: string }>()
  const requestedShortUrl = useRef<string | null>(null)
  const navigate = useNavigate()
  const [originalUrl, setOriginalUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!shortUrl || requestedShortUrl.current === shortUrl) return

    requestedShortUrl.current = shortUrl
    const currentShortUrl = shortUrl

    async function redirect() {
      try {
        const result = await getOriginalUrl(currentShortUrl)
        setOriginalUrl(result.originalUrl)
        // window.location.replace(result.originalUrl)
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
    <main className="flex min-h-dvh items-center justify-center bg-gray-200 px-4">
      <div className="flex w-full max-w-145 flex-col items-center justify-center gap-6 rounded-lg bg-gray-100 px-5 py-12 text-center md:px-12 md:py-16">
        <img src={logo_icon} alt="Brevly" className="size-12 shrink-0" />
        <h1 className="w-full text-center text-2xl leading-8 font-bold text-gray-600">
          Redirecionando...
        </h1>
        <div className="flex flex-col items-center text-sm text-gray-500">
          <p>O link será aberto automaticamente em alguns instantes.</p>
          <p>
            Não foi redirecionado?{' '}
            {originalUrl ? (
              <a
                href={originalUrl}
                className="font-semibold text-blue-base underline"
              >
                Acesse aqui
              </a>
            ) : (
              <span className="font-semibold text-gray-400">Acesse aqui</span>
            )}
          </p>
        </div>
      </div>
    </main>
  )
}
