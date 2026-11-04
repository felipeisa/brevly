import { create } from 'zustand'
import type { CreateLinkInput } from '../http/create-link'
import { createLink as createLinkHttp } from '../http/create-link'
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
  // createLink: (data: CreateLinkInput) => Promise<{ id: string }>
  createLink: (data: CreateLinkInput) => Promise<void>
  isFetchingLinks: boolean
}

export const useLinks = create<LinkState>(set => {
  async function fetchLinks() {
    set({ isFetchingLinks: true })

    try {
      const data = await getLinks()

      set({
        links: data.links,
        total: data.total,
      })
    } finally {
      set({ isFetchingLinks: false })
    }
  }

  async function deleteLink(shortUrl: string) {
    await deleteLinkHttp(shortUrl)
    // await fetchLinks()

    set(state => {
      const links = state.links.filter(link => link.shortUrl !== shortUrl)

      return {
        links,
        total: links.length,
      }
    })
  }

  async function createLink(data: CreateLinkInput) {
    await createLinkHttp(data)
    // await fetchLinks()
  }

  return {
    links: [],
    total: 0,
    fetchLinks,
    deleteLink,
    createLink,
    isFetchingLinks: false,
  }
})
