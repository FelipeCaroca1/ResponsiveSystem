import React from 'react'
import { Sidebar } from '../components/layout'
import { SidebarProvider } from '../context'

interface SidebarLayoutProps {
  children: React.ReactNode
}

const SidebarLayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <main className="flex-1 overflow-auto">
          {children}
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
