import React from 'react'
import { Sidebar } from '../components/layout'
import { SidebarProvider } from '../context'

interface SidebarLayoutProps {
  children: React.ReactNode
}

const SidebarLayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
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
