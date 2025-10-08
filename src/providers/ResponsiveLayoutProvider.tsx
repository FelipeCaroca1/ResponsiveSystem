import React, { useState } from 'react'
import { ResponsiveProvider } from './index'
import { useResponsive } from '../hooks'
import { ResponsiveLayoutContext } from '../context'
import { LAYOUT_CONFIG, DEFAULT_LAYOUT } from '../config/layout'

interface ResponsiveLayoutProviderProps {
  children: React.ReactNode
  defaultLayout?: string
}

const ResponsiveLayoutProviderInner: React.FC<{ children: React.ReactNode; defaultLayout: string }> = ({ 
  children, 
  defaultLayout 
}) => {
  const responsive = useResponsive()
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
  defaultLayout = DEFAULT_LAYOUT 
}) => {
  return (
    <ResponsiveProvider>
      <ResponsiveLayoutProviderInner defaultLayout={defaultLayout}>
        {children}
      </ResponsiveLayoutProviderInner>
    </ResponsiveProvider>
  )
}
