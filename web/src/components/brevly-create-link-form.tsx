import { InputField } from './brevly-input-field'

export function CreateLinkForm() {
  return (
    <div className="flex w-full flex-col items-start gap-6 rounded-lg bg-gray-100 p-8">
      <h2 className="text-lg font-bold leading-6 text-gray-600">Novo link</h2>
      <form className="flex w-full flex-col gap-6">
        <div className="flex w-full flex-col gap-4">
          <InputField
            id="original-url"
            label="LINK ORIGINAL"
            placeholder="www.exemplo.com.br"
            type="url"
          />
          <InputField
            id="short-url"
            label="LINK ENCURTADO"
            placeholder="brev.ly/"
            type="url"
          />
        </div>
        <button
          type="submit"
          disabled
          className="flex h-12 w-full items-center justify-center rounded-lg bg-blue-base px-5 text-sm font-semibold leading-4.5 text-white disabled:opacity-50"
        >
          Salvar link
        </button>
      </form>
    </div>
  )
}
