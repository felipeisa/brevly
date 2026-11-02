import logo from '../assets/logo.svg'
import { CreateLinkForm } from './brevly-create-link-form'
import { MyLinks } from './brevly-my-links'

export function Brevly() {
  return (
    <main className="min-h-dvh bg-gray-200 md:h-dvh md:overflow-hidden">
      <div className="mx-auto flex w-full max-w-245 flex-col px-4 py-8 md:h-full md:min-h-0 md:py-16">
        <div className="flex justify-center md:justify-start">
          <img src={logo} alt="Brev.ly" className="h-6" />
        </div>
        <div className="mt-8 flex flex-col items-start gap-4 md:min-h-0 md:flex-1 md:flex-row">
          <div className="w-full md:w-95 md:shrink-0">
            <CreateLinkForm />
          </div>
          <div className="w-full md:w-145 md:min-h-0">
            <MyLinks />
          </div>
        </div>
      </div>
    </main>
  )
}
