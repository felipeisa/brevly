import type { Link } from '../store/links'

type MyLinkItemProps = {
  link: Link
}

export function MyLinkItem({ link }: MyLinkItemProps) {
  return (
    <div className="flex w-full flex-row items-center py-0.5 gap-5">
      <div className="flex flex-1 flex-col items-start justify-center gap-1">
        <span className="text-sm font-semibold leading-4.5 text-blue-base">
          brev.ly/{link.shortUrl}
        </span>
        <span className="text-xs leading-4 text-gray-500">
          {link.originalUrl}
        </span>
      </div>
      <span className="shrink-0 text-right text-xs font-normal leading-4 text-gray-500">
        {link.accessCount} {link.accessCount === 1 ? 'acesso' : 'acessos'}
      </span>
      <div className="flex shrink-0 flex-row items-center gap-1">
        {/* botão copiar */}
        {/* botão excluir */}
      </div>
    </div>
  )
}
