import { CircleNotchIcon, DownloadSimpleIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'sonner'
import { exportLinks } from '../http/export-links'
import { useLinks } from '../store/links'

export function MyLinksHeader() {
  const total = useLinks(state => state.total)
  const isDownloadDisabled = total === 0
  const [isExporting, setIsExporting] = useState(false)

  async function handleExportLinks() {
    setIsExporting(true)
    try {
      const data = await exportLinks()
      const link = document.createElement('a')
      link.href = data.reportUrl
      link.download = ''
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch {
      toast.error('Não foi possível exportar os links')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="flex justify-between items-center gap-2 w-full">
      <h2 className="text-lg font-bold leading-6 text-gray-600">Meus links</h2>
      <button
        type="button"
        disabled={isDownloadDisabled || isExporting}
        onClick={handleExportLinks}
        className="flex h-8 items-center rounded-sm justify-center bg-gray-200 px-2 text-gray-500 gap-1.5 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed border border-transparent hover:border-blue-base"
      >
        {isExporting ? (
          <CircleNotchIcon className="size-4 animate-spin" />
        ) : (
          // <DownloadSimpleIcon strokeWidth={1.5} className="size-4" />
          <DownloadSimpleIcon weight="regular" className="size-4" />
        )}
        <span className="translate-y-px text-xs font-semibold leading-4">
          Baixar CSV
        </span>
      </button>
    </div>
  )
}
