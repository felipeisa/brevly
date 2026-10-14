import axios from 'axios'

interface ExportLinksResponse {
  reportUrl: string
}

export async function exportLinks() {
  const response = await axios.post<ExportLinksResponse>(
    'http://localhost:3333/link/exports'
  )

  return response.data
}
