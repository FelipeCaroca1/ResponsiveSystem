import React from 'react'
import { useResponsiveLayout } from '../hooks'
import { 
  DefaultLayout, 
  SidebarLayout, 
  DashboardLayout, 
  MinimalLayout 
} from './index'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { layout } = useResponsiveLayout()
  
  // Seleccionar el layout apropiado basado en el estado del contexto
  const layouts = {
    default: DefaultLayout,
    sidebar: SidebarLayout,
    dashboard: DashboardLayout,
    minimal: MinimalLayout,
  }
  
  const LayoutComponent = layouts[layout.current as keyof typeof layouts] || DefaultLayout
  
  return <LayoutComponent>{children}</LayoutComponent>
}

export default MainLayout
