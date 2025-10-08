import { useResponsiveLayout } from '../../hooks'
import { useNavigation, useSidebar } from '../../context'

const Sidebar = () => {
  const { isMobile, isTablet, breakpoint } = useResponsiveLayout()
  const { currentPage, setCurrentPage } = useNavigation()
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  
  const menuItems = [
    { id: 'test', label: 'Suite de Test' },
    { id: 'demo', label: 'Demo' },
  ]
  
  return (
    <>
      {/* Hamburger button para móvil */}
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors bg-black/50 border border-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Sidebar desktop */}
      <aside className={`
        bg-gradient-to-b from-gray-900 to-black border-r border-cyan-500/20
        ${isMobile ? 'hidden' : 'w-64 flex-shrink-0'}
        ${isTablet ? 'w-56' : 'w-64'}
      `}>
      <div className="p-6 flex flex-col h-full">
        {/* Logo y Breakpoint */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">RS</span>
          </div>
          <div>
            <span className="text-white font-bold text-lg">Sistema Responsivo</span>
            <div className="px-2 py-0.5 text-cyan-400 font-mono bg-black/50 border border-cyan-500/30 rounded text-xs font-bold tracking-widest mt-1">
              {breakpoint.toUpperCase()}
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id as 'demo' | 'test')}
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
      </aside>

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
    </>
  )
}

export default Sidebar
