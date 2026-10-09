import { Copy, Trash } from 'lucide-react'
import type { Link } from '../store/links'
import { IconButton } from './ui/icon-button'

type MyLinkItemProps = {
  link: Link
}

export function MyLinkItem({ link }: MyLinkItemProps) {
  return (
    <>
      <div className="w-full border-0 border-t border-gray-200" />
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
          <IconButton type="button" aria-label="Copiar link">
            <Copy className="size-4 text-gray-600" />
          </IconButton>
          <IconButton type="button" aria-label="Excluir link">
            <Trash className="size-4 text-gray-600" />
          </IconButton>
        </div>
      </div>
    </>
  )
}
