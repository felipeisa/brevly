import axios from 'axios'
import { type FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { useLinks } from '../store/links'
import { InputField } from './brevly-input-field'

export function CreateLinkForm() {
  const [originalUrl, setOriginalUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const createLink = useLinks(state => state.createLink)
  const isValidShortUrl = /^[a-z0-9-]+$/.test(shortUrl)

  function isValidUrl(value: string) {
    try {
      const url = new URL(value)
      return url.protocol === 'http:' || url.protocol === 'https:'
    } catch {
      return false
    }
  }

  async function handlerCreateLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)

    if (!isValidUrl(originalUrl) || !isValidShortUrl) {
      return
    }

    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      await createLink({
        originalUrl,
        shortUrl,
      })

      setOriginalUrl('')
      setShortUrl('')
      setSubmitted(false)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        toast.error('Erro no cadastro', {
          description: 'Essa URL encurtada já existe.',
        })
      } else {
        toast.error('Não foi possível criar o link.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const originalUrlError =
    submitted && !isValidUrl(originalUrl)
      ? 'Informe uma url válida.'
      : undefined
  const shortUrlError =
    submitted && !isValidShortUrl
      ? 'Informe uma url minúscula e sem espaço/caracter especial.'
      : undefined

  return (
    <div className="flex w-full flex-col items-start gap-6 rounded-lg bg-gray-100 p-8">
      <h2 className="text-lg font-bold leading-6 text-gray-600">Novo link</h2>
      <form className="flex w-full flex-col gap-6" onSubmit={handlerCreateLink}>
        <div className="flex w-full flex-col gap-4">
          <InputField
            id="original-url"
            label="LINK ORIGINAL"
            placeholder="www.exemplo.com.br"
            type="url"
            value={originalUrl}
            onChange={event => setOriginalUrl(event.target.value)}
            error={originalUrlError}
          />
          <InputField
            id="short-url"
            label="LINK ENCURTADO"
            prefix="brev.ly/"
            value={shortUrl}
            onChange={event => setShortUrl(event.target.value)}
            error={shortUrlError}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-12 w-full items-center justify-center rounded-lg bg-blue-base px-5 text-sm font-semibold leading-4.5 text-white disabled:opacity-50"
        >
          {isSubmitting ? 'Salvando...' : 'Salvar link'}
        </button>
      </form>
    </div>
  )
}
