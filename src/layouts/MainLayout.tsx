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
  /**
   * Layout específico a usar. Si se proporciona, sobrescribe el layout del contexto.
   * Valores posibles: 'default', 'sidebar', 'dashboard', 'minimal'
   */
  layout?: 'default' | 'sidebar' | 'dashboard' | 'minimal'
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, layout: layoutProp }) => {
  const { layout } = useResponsiveLayout()
  
  // Usar el layout del prop si se proporciona, sino usar el del contexto
  const currentLayout = layoutProp || layout.current
  
  // Seleccionar el layout apropiado basado en el estado del contexto o prop
  const layouts = {
    default: DefaultLayout,
    sidebar: SidebarLayout,
    dashboard: DashboardLayout,
    minimal: MinimalLayout,
  }
  
  const LayoutComponent = layouts[currentLayout as keyof typeof layouts] || DefaultLayout
  
  return <LayoutComponent>{children}</LayoutComponent>
}

export default MainLayout
