import { useResponsiveLayout } from '../../hooks'
import { useSidebar } from '../../context'

interface SidebarProps {
  showLogo?: boolean
}

const Sidebar = ({ showLogo = true }: SidebarProps) => {
  const { isMobile, isTablet } = useResponsiveLayout()
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  
  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ]
  
  return (
    <>
      {isMobile && (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
          className="fixed top-4 left-4 z-50 p-2 rounded border transition-opacity hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      <aside 
        className={`border-r h-full ${isMobile ? 'hidden' : 'w-64 flex-shrink-0'} ${isTablet ? 'w-56' : 'w-64'}`}
        aria-label="Sidebar navigation"
      >
        <div className="p-6 flex flex-col h-full overflow-y-auto">
          {showLogo && (
            <div className="flex items-center space-x-3 mb-8 flex-shrink-0">
              <div className="w-8 h-8 border rounded flex items-center justify-center flex-shrink-0">
                <span className="text-sm">Logo</span>
              </div>
              <span className="font-bold text-lg truncate">App Name</span>
            </div>
          )}
          
          <nav className={`space-y-2 flex-1 ${showLogo ? '' : 'pt-0'}`} role="navigation" aria-label="Main navigation">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className="w-full flex items-center px-4 py-3 rounded transition-all text-left hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2"
                aria-label={item.label}
              >
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {isMobile && sidebarOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          <aside 
            className="fixed top-0 left-0 w-64 h-full border-r z-50 overflow-y-auto"
            aria-label="Mobile sidebar navigation"
            role="dialog"
            aria-modal="true"
          >
            <div className="p-6 flex flex-col h-full pt-20">
              {showLogo && (
                <div className="flex items-center space-x-3 mb-8 flex-shrink-0">
                  <div className="w-8 h-8 border rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">Logo</span>
                  </div>
                  <span className="font-bold text-lg truncate">App Name</span>
                </div>
              )}
              
              <nav className={`space-y-2 flex-1 ${showLogo ? '' : 'pt-0'}`} role="navigation" aria-label="Main navigation">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="w-full flex items-center px-4 py-3 rounded transition-all text-left hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    aria-label={item.label}
                  >
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>
        </>
      )}
    </>
  )
}

export default Sidebar
