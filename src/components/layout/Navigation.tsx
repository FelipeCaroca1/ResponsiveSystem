import { useState } from 'react'
import { useResponsiveLayout } from '../../hooks'
import { useNavigation } from '../../context'

const Navigation = () => {
  const { isMobile, breakpoint } = useResponsiveLayout()
  const { currentPage, setCurrentPage } = useNavigation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const pages = [
    { id: 'demo', name: 'Demo' },
    { id: 'test', name: 'Suite de Test' }
  ]

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-cyan-500/20 shadow-2xl relative">
        <div className="w-full">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse"></div>
                <h3 className="text-base font-black text-white tracking-tight">
                  Sistema Responsivo
                </h3>
              </div>
              <div className="px-2 py-0.5 text-cyan-400 font-mono bg-black/50 border border-cyan-500/30 rounded text-xs font-bold tracking-widest">
                {breakpoint.toUpperCase()}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Botones visibles solo en desktop */}
              {!isMobile && pages.map(page => (
                <button
                  key={page.id}
                  onClick={() => setCurrentPage(page.id as 'demo' | 'test')}
                  className={`px-3 py-1.5 rounded-lg transition-all font-bold text-xs tracking-wide border ${
                    currentPage === page.id 
                      ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50' 
                      : 'bg-black/50 text-gray-400 hover:text-gray-300 border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {page.name}
                </button>
              ))}
              
              {/* Menú hamburguesa para móvil - A LA DERECHA */}
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Menú móvil desplegable - TRADICIONAL */}
      {isMobile && sidebarOpen && (
        <div className="absolute top-full left-0 right-0 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-cyan-500/20 shadow-2xl z-50">
          <div className="p-4">
            {/* Navigation - VERTICAL como menú tradicional */}
            <nav className="space-y-2">
              {pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => {
                    setCurrentPage(page.id as 'demo' | 'test')
                    setSidebarOpen(false)
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all font-bold text-sm tracking-wide border ${
                    currentPage === page.id 
                      ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50' 
                      : 'bg-black/50 text-gray-400 hover:text-gray-300 border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {page.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
      </nav>
    </div>
  )
}

export default Navigation
