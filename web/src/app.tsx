import { Toaster } from 'sonner'
import { Brevly } from './components/brevly'

export function App() {
  return (
    <>
      <Brevly />
      <Toaster position="bottom-right" richColors />
    </>
  )
}
