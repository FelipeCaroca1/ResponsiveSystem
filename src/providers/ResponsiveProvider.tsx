import React, { useMemo } from 'react'
import type { ResponsiveProviderProps } from '../types/responsive'
import { DEFAULT_BREAKPOINTS, DEFAULT_SPACING, DEFAULT_TYPOGRAPHY, DEFAULT_GRID } from '../constants/breakpoints'
import { ResponsiveContext } from '../context/ResponsiveContext'

// Componente Provider
export const ResponsiveProvider: React.FC<ResponsiveProviderProps> = ({
  children,
  breakpoints: customBreakpoints,
  spacing: customSpacing,
  typography: customTypography,
  grid: customGrid,
  debug = false
}) => {
  // Combinar configuración personalizada con la por defecto
  const breakpoints = useMemo(() => ({
    ...DEFAULT_BREAKPOINTS,
    ...customBreakpoints
  }), [customBreakpoints])

  const spacing = useMemo(() => ({
    ...DEFAULT_SPACING,
    ...customSpacing
  }), [customSpacing])

  const typography = useMemo(() => ({
    ...DEFAULT_TYPOGRAPHY,
    ...customTypography
  }), [customTypography])

  const grid = useMemo(() => ({
    ...DEFAULT_GRID,
    ...customGrid
  }), [customGrid])

  // Valor del context
  const contextValue = useMemo(() => ({
    breakpoints,
    spacing,
    typography,
    grid,
    debug
  }), [breakpoints, spacing, typography, grid, debug])

  return (
    <ResponsiveContext.Provider value={contextValue}>
      {children}
    </ResponsiveContext.Provider>
  )
}

