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
  
  // Mapa de layouts disponibles
  const layouts = {
    default: DefaultLayout,
    sidebar: SidebarLayout,
    dashboard: DashboardLayout,
    minimal: MinimalLayout,
  }
  
  // Determinar qué layout usar: prop > contexto > default
  const layoutToUse = layoutProp || layout.current || 'default'
  
  // Validar que el layout sea válido, si no usar default
  const validLayout = (layoutToUse && layouts[layoutToUse as keyof typeof layouts])
    ? layoutToUse
    : 'default'
  
  // Obtener el componente de layout
  const LayoutComponent = layouts[validLayout as keyof typeof layouts] || DefaultLayout
  
  return <LayoutComponent>{children}</LayoutComponent>
}

export default MainLayout
