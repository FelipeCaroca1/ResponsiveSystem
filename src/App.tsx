import { useState } from 'react'
import { ResponsiveProvider } from './index'
import ResponsiveTestPage from './pages/ResponsiveTestPage'
import ResponsiveDemo from './components/ResponsiveDemo'
import Navigation from './components/Navigation'

// App principal
function App() {
  const [currentPage, setCurrentPage] = useState<'demo' | 'test'>('test')

  return (
    <ResponsiveProvider debug={true}>
      <div className="min-h-screen bg-gray-50">
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        {currentPage === 'demo' ? <ResponsiveDemo /> : <ResponsiveTestPage />}
      </div>
    </ResponsiveProvider>
  )
}

export default App