import { MyLinksHeader } from './brevly-my-links-header'
import { MyLinksList } from './brevly-my-links-list'

export function MyLinks() {
  return (
    <div className="flex w-full flex-col items-start gap-5 rounded-lg bg-gray-100 p-8">
      <MyLinksHeader></MyLinksHeader>
      <MyLinksList></MyLinksList>
    </div>
  )
}
