import React from 'react'
import { useResponsiveLayout } from '../hooks'
import { Sidebar, Footer } from '../components/layout'
import { SidebarProvider, useSidebar } from '../context'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { layoutUtils } = useResponsiveLayout()
  const { setSidebarOpen } = useSidebar()
  
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Navbar para móvil (igual que SidebarLayout) */}
      <div className="sticky top-0 z-50">
        <nav className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-cyan-500/20 shadow-2xl relative">
          <div className="w-full">
            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {/* Hamburger button para móvil - A LA IZQUIERDA */}
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  
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
              </div>
            </div>
          </div>
        </nav>
      </div>
      
      {/* Content area con sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className={layoutUtils.getContainerClass()}>
            {children}
          </div>
        </main>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </SidebarProvider>
  )
}

export default DashboardLayout
