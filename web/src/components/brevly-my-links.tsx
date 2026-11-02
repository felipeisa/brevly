import { useEffect } from 'react'
import { useLinks } from '../store/links'
import { MyLinksHeader } from './brevly-my-links-header'
import { MyLinksList } from './brevly-my-links-list'

export function MyLinks() {
  const fetchLinks = useLinks(state => state.fetchLinks)

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
    <div className="flex w-full flex-col items-start gap-5 rounded-lg bg-gray-100 p-8">
      <MyLinksHeader />
      <MyLinksList />
    </div>
  )
}
