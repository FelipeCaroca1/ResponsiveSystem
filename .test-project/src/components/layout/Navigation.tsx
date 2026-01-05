import { useResponsiveLayout } from 'responsive-system'

const Navigation = () => {
  const { isMobile } = useResponsiveLayout()
  
  return (
    <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LO</span>
            </div>
            <h1 className="text-white font-semibold text-lg">Tu Aplicación</h1>
          </div>
          
          {isMobile && (
            <button className="p-2 text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
