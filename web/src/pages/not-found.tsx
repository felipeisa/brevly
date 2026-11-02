import { Link } from 'react-router'
import notFoundImage from '../assets/404.svg'

export function NotFound() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-gray-200 px-3 md:px-4">
      <div className="flex w-full max-w-145 flex-col items-center justify-center gap-6 rounded-lg bg-gray-100 px-5 py-12 text-center md:px-12 md:py-16">
        <img
          src={notFoundImage}
          alt="Erro 404"
          className="h-21.25 w-48.5 shrink-0"
        />
        <h1 className="w-full text-center text-2xl leading-8 font-bold text-gray-600">
          Link não encontrado
        </h1>
        <p className="w-full text-center text-sm leading-4.5 font-semibold text-gray-500">
          O link que você está tentando acessar não existe, foi removido ou é
          uma URL inválida. Saiba mais em{' '}
          <Link to="/" className="text-blue-base underline">
            brev.ly
          </Link>
          .
        </p>
      </div>
    </main>
  )
}
