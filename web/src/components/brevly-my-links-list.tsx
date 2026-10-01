import { Link } from 'lucide-react'
import { useLinks } from '../store/links'
import { MyLinkItem } from './brevly-my-link-item'

export function MyLinksList() {
  const links = useLinks(state => state.links)
  const isLinksListEmpty = links.length === 0

  return (
    <div className="flex w-full flex-col items-start gap-4">
      {/* <div className="w-full border-0 border-t border-gray-200"></div> */}
      <div className="flex w-full flex-col items-center justify-center gap-3 pt-4 pb-6">
        {isLinksListEmpty ? (
          <>
            <Link className="size-8 text-gray-400" strokeWidth={1.5}></Link>
            <span className="text-center text-[10px] leading-3.5 font-normal uppercase text-gray-500">
              Ainda não existem links cadastrados
            </span>
          </>
        ) : (
          links.map(link => <MyLinkItem key={link.id} link={link} />)
        )}
      </div>
    </div>
  )
}
