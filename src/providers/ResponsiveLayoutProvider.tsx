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
  
  const [currentLayout, setCurrentLayout] = useState(defaultLayout)
  
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
  return (
    <ResponsiveProvider>
      <ResponsiveLayoutProviderInner 
        defaultLayout={defaultLayout}
        useResponsiveHook={useResponsiveHook}
      >
        {children}
      </ResponsiveLayoutProviderInner>
    </ResponsiveProvider>
  )
}
