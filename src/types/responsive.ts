// Tipos para el sistema responsive

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'

export type Orientation = 'portrait' | 'landscape'

export type SpacingType = 'padding' | 'margin' | 'gap'

export type TextLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'small'

export type CardType = 'small' | 'medium' | 'large'

export type ResponsiveClassType = 'container' | 'button' | 'card' | 'input' | 'grid'

// Configuración de breakpoints
export interface BreakpointConfig {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  '2xl': number
  '3xl': number
  '4xl': number
  '5xl': number
}

// Configuración de spacing
export interface SpacingConfig {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
  '3xl': string
  '4xl': string
  '5xl': string
}

// Configuración de tipografía
export interface TypographyConfig {
  h1: SpacingConfig
  h2: SpacingConfig
  h3: SpacingConfig
  h4: SpacingConfig
  h5: SpacingConfig
  h6: SpacingConfig
  body: SpacingConfig
  caption: SpacingConfig
  small: SpacingConfig
}

// Configuración de grid
export interface GridConfig {
  small: Record<Breakpoint, string>
  medium: Record<Breakpoint, string>
  large: Record<Breakpoint, string>
}

// Configuración de clases responsive
export interface ResponsiveClasses {
  base?: string
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  '2xl'?: string
  '3xl'?: string
  '4xl'?: string
  '5xl'?: string
}

// Estado del hook useResponsive
export interface ResponsiveState {
  // Breakpoint actual
  breakpoint: Breakpoint
  breakpointValue: number
  breakpointIndex: number
  
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
  
  // Dimensiones
  width: number
  height: number
  viewportWidth: number
  viewportHeight: number
  
  // Orientación
  orientation: Orientation
  isPortrait: boolean
  isLandscape: boolean
  
  // Funciones de comparación
  isBreakpoint: (breakpoint: Breakpoint) => boolean
  isBreakpointUp: (breakpoint: Breakpoint) => boolean
  isBreakpointDown: (breakpoint: Breakpoint) => boolean
  isBreakpointBetween: (min: Breakpoint, max: Breakpoint) => boolean
  isWidth: (width: number) => boolean
  isWidthUp: (width: number) => boolean
  isWidthDown: (width: number) => boolean
  isWidthBetween: (min: number, max: number) => boolean
  
  // Utilidades de Tailwind
  getResponsiveClass: (type: ResponsiveClassType) => string
  getResponsiveClasses: (classes: ResponsiveClasses) => string
  getSpacing: (type: SpacingType) => string
  getResponsiveSpacing: (config: SpacingConfig) => string
  getTextSize: (level: TextLevel) => string
  getResponsiveText: (config: SpacingConfig) => string
  getCardGrid: (type?: CardType) => string
  getResponsiveGrid: (config: Record<Breakpoint, string>) => string
  
  // Debug
  debug: {
    breakpoint: Breakpoint
    width: number
    height: number
    orientation: Orientation
    timestamp: number
  }
}

// Configuración del provider
export interface ResponsiveProviderProps {
  children: React.ReactNode
  breakpoints?: Partial<BreakpointConfig>
  spacing?: Partial<SpacingConfig>
  typography?: Partial<TypographyConfig>
  grid?: Partial<GridConfig>
  debug?: boolean
}

// Configuración por defecto
export interface DefaultConfig {
  breakpoints: BreakpointConfig
  spacing: SpacingConfig
  typography: TypographyConfig
  grid: GridConfig
}
