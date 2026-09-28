import { CreateLinkForm } from './brevly-create-link-form'

export function Brevly() {
  return (
    <main className="min-h-dvh bg-gray-200">
      <div className="mx-auto w-full max-w-245 px-4 py-16">
        {/* Logo */}

        <div className="mt-8 flex flex-col items-start gap-4 md:flex-row">
          <div className="w-full md:w-95 md:shrink-0">
            <CreateLinkForm />
          </div>

          {/* Meus links */}
        </div>
      </div>
    </main>
  )
}
