import { useResponsiveLayout } from '../../hooks'
import { useSidebar } from '../../context'

const Sidebar = () => {
  const { isMobile, isTablet } = useResponsiveLayout()
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  
  const menuItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'about', label: 'Acerca' },
    { id: 'contact', label: 'Contacto' },
  ]
  
  return (
    <>
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 bg-gray-900 border border-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      <aside className={`bg-gray-900 border-r border-gray-800 ${isMobile ? 'hidden' : 'w-64 flex-shrink-0'} ${isTablet ? 'w-56' : 'w-64'}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LO</span>
            </div>
            <span className="text-white font-bold text-lg">Tu Aplicación</span>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className="w-full flex items-center px-4 py-3 rounded-lg transition-all text-left text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setSidebarOpen(false)}>
          <div className="fixed top-0 left-0 w-64 h-full bg-gray-900 border-r border-gray-800">
            <div className="p-6 flex flex-col h-full pt-20">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">LO</span>
                </div>
                <span className="text-white font-bold text-lg">Tu Aplicación</span>
              </div>
              
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSidebarOpen(false)}
                    className="w-full flex items-center px-4 py-3 rounded-lg transition-all text-left text-gray-300 hover:text-white hover:bg-gray-800"
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
