import React from 'react'
import { Sidebar, Footer } from '../components/layout'
import { SidebarProvider } from '../context'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Content area con sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main content */}
        <main className="flex-1 overflow-auto flex flex-col">
          <div className="flex-1">
            {children}
          </div>
          
          {/* Footer */}
          <Footer />
        </main>
      </div>
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
