import { create } from 'zustand'
import { deleteLink as deleteLinkHttp } from '../http/delete-link'
import { getLinks } from '../http/get-links'

export type Link = {
  id: string
  originalUrl: string
  shortUrl: string
  accessCount: number
  createdAt: string
}

type LinkState = {
  links: Link[]
  total: number
  fetchLinks: () => Promise<void>
  deleteLink: (shortUrl: string) => Promise<void>
}

export const useLinks = create<LinkState>(set => {
  async function fetchLinks() {
    const data = await getLinks()

    set({
      links: data.links,
      total: data.total,
    })
  }

  async function deleteLink(shortUrl: string) {
    await deleteLinkHttp(shortUrl)
    await fetchLinks()
  }

  return {
    links: [],
    total: 0,
    fetchLinks,
    deleteLink,
  }
})
