import React from 'react'
import { withResponsiveConfig } from '../hocs/withResponsiveConfig'
import type { ResponsiveContextType } from '../context/ResponsiveContext'

// Ejemplo de componente que usa el HOC
interface MyComponentProps {
  title: string
  responsiveConfig: ResponsiveContextType
}

const MyComponent: React.FC<MyComponentProps> = ({ title, responsiveConfig }) => {
  const { breakpoints, debug, spacing, typography } = responsiveConfig
  
  // Usar las funciones del sistema responsive desde la configuración
  const getSpacing = (type: 'padding' | 'margin') => {
    const spacingConfig = type === 'padding' ? spacing : spacing // spacing ya es el padding config
    return Object.entries(spacingConfig)
      .map(([breakpoint, value]) => 
        breakpoint === 'xs' ? value : `${breakpoint}:${value}`
      )
      .join(' ')
  }

  const getTextSize = (level: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption') => {
    const typographyConfig = typography[level]
    return Object.entries(typographyConfig)
      .map(([breakpoint, value]) => 
        breakpoint === 'xs' ? value : `${breakpoint}:${value}`
      )
      .join(' ')
  }
  
  return (
    <div className={`${getSpacing('padding')} bg-white rounded-lg shadow`}>
      <h2 className={`font-bold mb-2 ${getTextSize('h2')}`}>{title}</h2>
      <p className={getTextSize('body')}>Breakpoint xs: {breakpoints.xs}px</p>
      <p className={getTextSize('body')}>Debug mode: {debug ? 'ON' : 'OFF'}</p>
    </div>
  )
}

// Componente envuelto con HOC
export const ResponsiveMyComponent = withResponsiveConfig(MyComponent)

// Ejemplo de uso:
// <ResponsiveMyComponent title="Mi Componente" />
