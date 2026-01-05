// Tipos para el sistema responsive
import type React from 'react'

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'

export type Orientation = 'portrait' | 'landscape'

// Estado del hook useResponsive (simplificado)
export interface ResponsiveState {
  // Breakpoint actual
  breakpoint: Breakpoint
  
  // Dimensiones
  width: number
  height: number
  
  // Orientación
  orientation: Orientation
  isPortrait: boolean
  isLandscape: boolean
  
  // Helpers booleanos específicos
  isXs: boolean
  isSm: boolean
  isMd: boolean
  isLg: boolean
  isXl: boolean
  is2Xl: boolean
  is3Xl: boolean
  is4Xl: boolean
  is5Xl: boolean
  
  // Helpers agrupados
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isSmall: boolean
  isLarge: boolean
  isUltraWide: boolean
  is4K: boolean
  is5K: boolean
  
  // Funciones de comparación de breakpoints
  isBreakpointUp: (breakpoint: Breakpoint) => boolean
  isBreakpointDown: (breakpoint: Breakpoint) => boolean
  isBreakpointBetween: (min: Breakpoint, max: Breakpoint) => boolean
  
  // Funciones de comparación de dimensiones
  isWidthUp: (width: number) => boolean
  isWidthDown: (width: number) => boolean
  isWidthBetween: (min: number, max: number) => boolean
  isHeightUp: (height: number) => boolean
  isHeightDown: (height: number) => boolean
  isHeightBetween: (min: number, max: number) => boolean
  
  // Debug
  debug: boolean
}

// Configuración del provider (simplificada)
export interface ResponsiveProviderProps {
  children: React.ReactNode
  debug?: boolean
}
