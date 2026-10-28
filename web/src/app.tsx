import { BrowserRouter, Route, Routes } from 'react-router'
import { Toaster } from 'sonner'
import { Brevly } from './components/brevly'
import { RedirectPage } from './pages/redirect-page'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Brevly />} />
        <Route path="/:shortUrl" element={<RedirectPage />} />
        <Route path="/404" element={<RedirectPage />} />
      </Routes>
      <Toaster position="bottom-right" richColors />
    </BrowserRouter>
  )
}
