import React, { useState } from 'react'
import { ResponsiveProvider } from './index'
import { useResponsive } from '../hooks'
import { ResponsiveLayoutContext } from '../context'
import { LAYOUT_CONFIG, DEFAULT_LAYOUT } from '../config/layout'
import type { ResponsiveState } from '../types/responsive'

interface ResponsiveLayoutProviderProps {
  children: React.ReactNode
  defaultLayout?: string
  /**
   * Hook responsivo personalizado del proyecto consumidor.
   * Si se proporciona, se usará en lugar del hook interno del paquete.
   * Debe retornar un objeto compatible con ResponsiveState.
   */
  useResponsiveHook?: () => ResponsiveState
}

interface ResponsiveLayoutProviderInnerProps {
  children: React.ReactNode
  defaultLayout: string
  useResponsiveHook?: () => ResponsiveState
}

const ResponsiveLayoutProviderInner: React.FC<ResponsiveLayoutProviderInnerProps> = ({ 
  children, 
  defaultLayout,
  useResponsiveHook
}) => {
  // Usar hook personalizado si se proporciona, sino usar el hook interno
  const internalResponsive = useResponsive()
  const customResponsive = useResponsiveHook?.()
  const responsive = customResponsive || internalResponsive
  
  // Inicializar el estado con el layout normalizado usando función inicializadora
  // Esto asegura que solo se ejecute una vez, incluso con React.StrictMode
  const [currentLayout, setCurrentLayout] = useState(() => {
    // Validar y normalizar el defaultLayout directamente en la función inicializadora
    if (defaultLayout && typeof defaultLayout === 'string' && LAYOUT_CONFIG[defaultLayout]) {
      return defaultLayout
    }
    return DEFAULT_LAYOUT
  })
  
  const layoutConfig = LAYOUT_CONFIG[currentLayout] || LAYOUT_CONFIG[DEFAULT_LAYOUT]
  
  const layoutUtils = {
    getContainerClass: () => {
      if (responsive.isMobile) return layoutConfig.responsive.mobile
      if (responsive.isTablet) return layoutConfig.responsive.tablet
      return layoutConfig.responsive.desktop
    },
    
    getMainClass: () => {
      const baseClass = 'min-h-screen bg-black'
      if (currentLayout === 'sidebar' || currentLayout === 'dashboard') {
        return `${baseClass} flex`
      }
      return baseClass
    },
    
    hasSidebar: () => currentLayout === 'sidebar' || currentLayout === 'dashboard',
    hasHeader: () => currentLayout === 'dashboard',
    hasFooter: () => currentLayout === 'default' || currentLayout === 'dashboard',
    hasNavigation: () => currentLayout === 'default',
  }
  
  const contextValue = {
    responsive,
    layout: {
      current: currentLayout,
      config: layoutConfig,
      setLayout: setCurrentLayout,
    },
    layoutUtils,
  }
  
  return (
    <ResponsiveLayoutContext.Provider value={contextValue}>
      {children}
    </ResponsiveLayoutContext.Provider>
  )
}

export const ResponsiveLayoutProvider: React.FC<ResponsiveLayoutProviderProps> = ({ 
  children, 
  defaultLayout = DEFAULT_LAYOUT,
  useResponsiveHook
}) => {
  // Normalizar el defaultLayout antes de pasarlo al componente interno
  const normalizedDefaultLayout = (defaultLayout && typeof defaultLayout === 'string' && LAYOUT_CONFIG[defaultLayout])
    ? defaultLayout
    : DEFAULT_LAYOUT
  
  return (
    <ResponsiveProvider>
      <ResponsiveLayoutProviderInner 
        defaultLayout={normalizedDefaultLayout}
        useResponsiveHook={useResponsiveHook}
      >
        {children}
      </ResponsiveLayoutProviderInner>
    </ResponsiveProvider>
  )
}
