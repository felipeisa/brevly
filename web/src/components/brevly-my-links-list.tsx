import { LinkIcon, SpinnerIcon } from '@phosphor-icons/react'
import { useLinks } from '../store/links'
import { MyLinkItem } from './brevly-my-link-item'

export function MyLinksList() {
  const links = useLinks(state => state.links)
  const isFetchingLinks = useLinks(state => state.isFetchingLinks)
  const hasFetchingLinks = useLinks(state => state.hasFetchingLinks)

  const isInitialLoading = isFetchingLinks && !hasFetchingLinks
  const isLinksListEmpty = links.length === 0

  return (
    <div className="scrollbar-brevly flex w-full min-h-0 flex-col items-start gap-4 overflow-y-auto">
      {isInitialLoading ? (
        <>
          <div className="w-full border-t border-gray-200" />

          <div
            role="status"
            className="flex w-full flex-col items-center justify-center gap-3 py-6"
          >
            <SpinnerIcon
              weight="regular"
              className="size-5 animate-spin text-gray-400"
            />

            <span className="text-[10px] font-normal uppercase text-gray-500">
              Carregando links...
            </span>
          </div>
        </>
      ) : isLinksListEmpty ? (
        <>
          <div className="w-full border-0 border-t border-gray-200" />
          <div className="flex w-full flex-col items-center justify-center gap-3 pt-4 pb-6">
            <LinkIcon
              weight="regular"
              className="size-8 text-gray-400"
              strokeWidth={1.5}
            ></LinkIcon>
            <span className="text-center text-[10px] leading-3.5 font-normal uppercase text-gray-500">
              Ainda não existem links cadastrados
            </span>
          </div>
        </>
      ) : (
        links.map(link => <MyLinkItem key={link.id} link={link} />)
      )}
    </div>
  )
}
