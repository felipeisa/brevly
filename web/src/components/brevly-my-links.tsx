import { useEffect } from 'react'
import { useLinks } from '../store/links'
import { MyLinksHeader } from './brevly-my-links-header'
import { MyLinksList } from './brevly-my-links-list'

export function MyLinks() {
  const fetchLinks = useLinks(state => state.fetchLinks)
  const isFetchingLinks = useLinks(state => state.isFetchingLinks)

  useEffect(() => {
    fetchLinks()

    function handleFocus() {
      fetchLinks()
    }

    window.addEventListener('focus', handleFocus)

    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [fetchLinks])

  return (
    <div className="relative flex max-h-full min-h-0 w-full flex-col items-start gap-5 overflow-hidden rounded-lg bg-gray-100 p-8">
      {isFetchingLinks && (
        <div className="absolute inset-x-0 top-0 z-10 h-0.5 overflow-hidden">
          <div className="loading-bar bg-blue-base" />
        </div>
      )}
      <MyLinksHeader />
      <MyLinksList />
    </div>
  )
}
