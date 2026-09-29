import logo from '../assets/logo.svg'
import { CreateLinkForm } from './brevly-create-link-form'
import { MyLinks } from './brevly-my-links'

export function Brevly() {
  return (
    <main className="min-h-dvh bg-gray-200">
      <div className="mx-auto w-full max-w-245 px-4 py-8 md:py-16">
        <div className="flex justify-center md:justify-start">
          <img src={logo} alt="Brev.ly" className="h-6" />
        </div>
        {/* <div className="mt-8 flex flex-col items-start gap-4 md:flex-row"> */}
        <div className="mt-8 flex flex-col items-start gap-4 md:flex-row">
          <div className="w-full md:w-95 md:shrink-0">
            <CreateLinkForm />
          </div>
          <div className="w-full md:w-145">
            <MyLinks />
          </div>
        </div>
      </div>
    </main>
  )
}
