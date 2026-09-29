import { Link } from 'lucide-react'

export function MyLinksList() {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      {/* <div className="h-px bg-gray-200 border-t align-top border-black/50 box-content"></div> */}
      <div className="w-full border-0 border-t border-gray-200"></div>
      <div className="flex w-full flex-col items-center justify-center gap-3 pt-4 pb-6">
        <Link className="size-8 text-gray-400" strokeWidth={1.5}></Link>
        <span className="text-center text-[10px] leading-3.5 font-normal uppercase text-gray-500">
          Ainda não existem links cadastrados
        </span>
      </div>
    </div>
  )
}
