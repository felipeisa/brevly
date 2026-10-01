import { create } from 'zustand'
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
}

export const useLinks = create<LinkState>(set => {
  async function fetchLinks() {
    const data = await getLinks()

    set({
      links: data.links,
      total: data.total,
    })
  }

  return {
    links: [],
    total: 0,
    fetchLinks,
  }
})
