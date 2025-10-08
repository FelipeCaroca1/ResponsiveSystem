import { createContext, useContext } from 'react'
import type { ResponsiveState } from '../types/responsive'
import type { LayoutConfig } from '../config/layout'

export interface ResponsiveLayoutState {
  // Estado del sistema responsivo
  responsive: ResponsiveState
  
  // Estado del layout
  layout: {
    current: string
    config: LayoutConfig
    setLayout: (layout: string) => void
  }
  
  // Utilidades de layout
  layoutUtils: {
    getContainerClass: () => string
    getMainClass: () => string
    hasSidebar: () => boolean
    hasHeader: () => boolean
    hasFooter: () => boolean
    hasNavigation: () => boolean
  }
}

const ResponsiveLayoutContext = createContext<ResponsiveLayoutState | undefined>(undefined)

export const useResponsiveLayoutContext = () => {
  const context = useContext(ResponsiveLayoutContext)
  if (!context) {
    throw new Error('useResponsiveLayoutContext must be used within a ResponsiveLayoutProvider')
  }
  return context
}

export { ResponsiveLayoutContext }
