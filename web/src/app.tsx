import { BrowserRouter, Route, Routes } from 'react-router'
import { Toaster } from 'sonner'
import { Brevly } from './components/brevly'
import { NotFound } from './pages/not-found'
import { RedirectPage } from './pages/redirect-page'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Brevly />} />
        <Route path="/url/not-found" element={<NotFound />} />
        <Route path="/:shortUrl" element={<RedirectPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="bottom-right" richColors />
    </BrowserRouter>
  )
}
