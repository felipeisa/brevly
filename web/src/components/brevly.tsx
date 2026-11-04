import logo from '../assets/logo.svg'
import { CreateLinkForm } from './brevly-create-link-form'
import { MyLinks } from './brevly-my-links'

export function Brevly() {
  return (
    <main className="h-dvh bg-gray-200 overflow-hidden">
      <div className="mx-auto flex w-full max-w-245 flex-col px-4 py-8 h-full min-h-0 md:py-16">
        <div className="flex shrink-0 justify-center md:justify-start">
          <img src={logo} alt="Brev.ly" className="h-6" />
        </div>
        <div className="mt-8 flex flex-col items-start gap-4 min-h-0 flex-1 md:flex-row">
          <div className="w-full md:w-95 shrink-0">
            <CreateLinkForm />
          </div>
          <div className="w-full flex-1 md:h-full md:w-145 min-h-0 md:flex-none">
            <MyLinks />
          </div>
        </div>
      </div>
    </main>
  )
}
