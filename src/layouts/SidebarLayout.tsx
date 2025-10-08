import React from 'react'
import { useResponsiveLayout } from '../hooks'
import { Sidebar } from '../components/layout'
import { SidebarProvider } from '../context'

interface SidebarLayoutProps {
  children: React.ReactNode
}

const SidebarLayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { layoutUtils } = useResponsiveLayout()
  
  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className={layoutUtils.getContainerClass()}>
          {children}
        </div>
      </main>
    </div>
  )
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <SidebarLayoutContent>{children}</SidebarLayoutContent>
    </SidebarProvider>
  )
}

export default SidebarLayout
