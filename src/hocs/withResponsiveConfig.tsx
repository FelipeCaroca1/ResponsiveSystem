import React from 'react'
import { useResponsiveConfig } from '../hooks/useResponsiveConfig'
import type { ResponsiveContextType } from '../context/ResponsiveContext'

// HOC para componentes que necesiten configuración responsive
export const withResponsiveConfig = <P extends object>(
  Component: React.ComponentType<P & { responsiveConfig: ResponsiveContextType }>
): React.FC<P> => {
  const WrappedComponent: React.FC<P> = (props) => {
    const config = useResponsiveConfig()
    
    return (
      <Component 
        {...props} 
        responsiveConfig={config}
      />
    )
  }
  
  WrappedComponent.displayName = `withResponsiveConfig(${Component.displayName || Component.name})`
  
  return WrappedComponent
}
