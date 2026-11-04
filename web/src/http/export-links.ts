import { api } from './api'

interface ExportLinksResponse {
  reportUrl: string
}

export async function exportLinks() {
  const response = await api.post<ExportLinksResponse>('/link/exports')

  return response.data
}
