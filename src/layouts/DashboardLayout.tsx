import React from 'react'
import { Navigation, Sidebar, Footer } from '../components/layout'
import { SidebarProvider } from '../context'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col h-screen">
      <Navigation />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar showLogo={false} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
          <div className="flex-1">
            {children}
          </div>
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
