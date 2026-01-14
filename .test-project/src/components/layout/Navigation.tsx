import { useResponsiveLayout } from 'responsive-system'

const Navigation = () => {
  const { isMobile } = useResponsiveLayout()
  
  return (
    <nav className="sticky top-0 z-50 border-b bg-white">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border rounded flex items-center justify-center flex-shrink-0">
              <span className="text-sm">Logo</span>
            </div>
            <h1 className="font-semibold text-lg truncate">App Name</h1>
          </div>
          
          {isMobile && (
            <button
              type="button"
              aria-label="Toggle menu"
              className="p-2 rounded transition-opacity hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
