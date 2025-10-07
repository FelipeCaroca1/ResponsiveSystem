import { createContext } from 'react'
import type { BreakpointConfig, SpacingConfig, TypographyConfig, GridConfig } from '../types/responsive'

// Context para la configuración responsive
export interface ResponsiveContextType {
  breakpoints: BreakpointConfig
  spacing: SpacingConfig
  typography: TypographyConfig
  grid: GridConfig
  debug: boolean
}

// Crear el context
export const ResponsiveContext = createContext<ResponsiveContextType | undefined>(undefined)
