import { useResponsiveLayout } from '../../hooks'
import { useNavigation, useSidebar } from '../../context'

const Header = () => {
  const { isMobile } = useResponsiveLayout()
  const { currentPage, setCurrentPage } = useNavigation()
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  
  const menuItems = [
    { id: 'test', label: 'Suite de Test' },
    { id: 'demo', label: 'Demo' },
  ]
  
  return (
    <div className="sticky top-0 z-50">
      <header className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-cyan-500/20 shadow-2xl relative">
        <div className="w-full">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {/* Hamburger button para móvil - A LA IZQUIERDA */}
                {isMobile && (
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                )}
                
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse"></div>
                  <h3 className="text-base font-black text-white tracking-tight">
                    Sistema Responsivo
                  </h3>
                </div>
                <div className="px-2 py-0.5 text-cyan-400 font-mono bg-black/50 border border-cyan-500/30 rounded text-xs font-bold tracking-widest">
                  DASHBOARD
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* Botones visibles solo en desktop */}
                {!isMobile && menuItems.map((page) => (
                  <button
                    key={page.id}
                    onClick={() => setCurrentPage(page.id as 'demo' | 'test')}
                    className={`px-3 py-1.5 rounded-lg transition-all font-bold text-xs tracking-wide border ${
                      currentPage === page.id 
                        ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50' 
                        : 'bg-black/50 text-gray-400 hover:text-gray-300 border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    {page.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar móvil desplegable */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setSidebarOpen(false)}>
          <div className="fixed top-0 left-0 w-64 h-full bg-gradient-to-b from-gray-900 to-black border-r border-cyan-500/20">
            <div className="p-6 flex flex-col h-full pt-20">
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">RS</span>
                </div>
                <span className="text-white font-bold text-lg">Sistema Responsivo</span>
              </div>
              
              {/* Navigation */}
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id as 'demo' | 'test')
                      setSidebarOpen(false)
                    }}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-all group text-left ${
                      currentPage === item.id 
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' 
                        : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10'
                    }`}
                  >
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
