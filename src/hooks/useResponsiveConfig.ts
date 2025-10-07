import { useContext } from 'react'
import type { BreakpointConfig, SpacingConfig, TypographyConfig, GridConfig } from '../types/responsive'
import { ResponsiveContext } from '../context/ResponsiveContext'

// Hook para usar el context
export const useResponsiveConfig = () => {
  const context = useContext(ResponsiveContext)
  if (context === undefined) {
    throw new Error('useResponsiveConfig must be used within a ResponsiveProvider')
  }
  return context
}

// Hook para obtener configuración específica
export const useBreakpoints = (): BreakpointConfig => {
  const { breakpoints } = useResponsiveConfig()
  return breakpoints
}

export const useSpacing = (): SpacingConfig => {
  const { spacing } = useResponsiveConfig()
  return spacing
}

export const useTypography = (): TypographyConfig => {
  const { typography } = useResponsiveConfig()
  return typography
}

export const useGrid = (): GridConfig => {
  const { grid } = useResponsiveConfig()
  return grid
}

export const useDebug = (): boolean => {
  const { debug } = useResponsiveConfig()
  return debug
}
