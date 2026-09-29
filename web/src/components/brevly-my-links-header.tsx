import { Download } from 'lucide-react'

export function MyLinksHeader() {
  return (
    <div className="flex justify-between items-center gap-2 w-full">
      <h2 className="text-lg font-bold leading-6 text-gray-600">Meus links</h2>
      <button
        type="button"
        disabled
        className="flex h-8 items-center rounded-sm justify-center bg-gray-200 px-2 text-gray-500 gap-1.5 disabled:opacity-50"
      >
        {/* <div className="flex items-end gap-1.5"> */}
        <Download strokeWidth={1.5} className="size-4" />
        {/* <span className="flex items-center text-xs font-semibold leading-4"> */}
        <span className="translate-y-px text-xs font-semibold leading-4">
          {/* <span className="h-5 w-5">*/}
          Baixar CSV
        </span>
        {/* </div> */}
      </button>
    </div>
  )
}
