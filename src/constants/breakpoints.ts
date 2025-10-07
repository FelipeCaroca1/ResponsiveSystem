import type { BreakpointConfig, SpacingConfig, TypographyConfig, GridConfig, DefaultConfig, Breakpoint } from '../types/responsive'

// Breakpoints estándar
export const DEFAULT_BREAKPOINTS: BreakpointConfig = {
  xs: 475,    // Móvil pequeño
  sm: 640,    // Móvil grande
  md: 768,    // Tablet
  lg: 1024,   // Laptop
  xl: 1280,   // Desktop
  '2xl': 1536, // Desktop grande
  '3xl': 1920, // Full HD
  '4xl': 2560, // 2K/QHD
  '5xl': 3840  // 4K/UHD
}

// Configuración de spacing por defecto
export const DEFAULT_SPACING: SpacingConfig = {
  xs: 'p-2',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
  '2xl': 'p-12',
  '3xl': 'p-16',
  '4xl': 'p-20',
  '5xl': 'p-24'
}

// Configuración de tipografía por defecto
export const DEFAULT_TYPOGRAPHY: TypographyConfig = {
  h1: {
    xs: 'text-2xl',
    sm: 'text-3xl',
    md: 'text-4xl',
    lg: 'text-5xl',
    xl: 'text-6xl',
    '2xl': 'text-7xl',
    '3xl': 'text-8xl',
    '4xl': 'text-9xl',
    '5xl': 'text-9xl'
  },
  h2: {
    xs: 'text-xl',
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
    xl: 'text-5xl',
    '2xl': 'text-6xl',
    '3xl': 'text-7xl',
    '4xl': 'text-8xl',
    '5xl': 'text-8xl'
  },
  h3: {
    xs: 'text-lg',
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
    '2xl': 'text-5xl',
    '3xl': 'text-6xl',
    '4xl': 'text-7xl',
    '5xl': 'text-7xl'
  },
  h4: {
    xs: 'text-base',
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
    '2xl': 'text-4xl',
    '3xl': 'text-5xl',
    '4xl': 'text-6xl',
    '5xl': 'text-6xl'
  },
  h5: {
    xs: 'text-sm',
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
    '2xl': 'text-3xl',
    '3xl': 'text-4xl',
    '4xl': 'text-5xl',
    '5xl': 'text-5xl'
  },
  h6: {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-4xl'
  },
  body: {
    xs: 'text-sm',
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-2xl',
    '4xl': 'text-3xl',
    '5xl': 'text-3xl'
  },
  caption: {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-base',
    '2xl': 'text-lg',
    '3xl': 'text-lg',
    '4xl': 'text-xl',
    '5xl': 'text-xl'
  },
  small: {
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-sm',
    xl: 'text-base',
    '2xl': 'text-base',
    '3xl': 'text-lg',
    '4xl': 'text-lg',
    '5xl': 'text-lg'
  }
}

// Configuración de grid por defecto
export const DEFAULT_GRID: GridConfig = {
  small: {
    xs: 'grid-cols-1',
    sm: 'grid-cols-2',
    md: 'grid-cols-3',
    lg: 'grid-cols-4',
    xl: 'grid-cols-5',
    '2xl': 'grid-cols-6',
    '3xl': 'grid-cols-8',
    '4xl': 'grid-cols-10',
    '5xl': 'grid-cols-12'
  },
  medium: {
    xs: 'grid-cols-1',
    sm: 'grid-cols-1',
    md: 'grid-cols-2',
    lg: 'grid-cols-3',
    xl: 'grid-cols-4',
    '2xl': 'grid-cols-5',
    '3xl': 'grid-cols-6',
    '4xl': 'grid-cols-8',
    '5xl': 'grid-cols-10'
  },
  large: {
    xs: 'grid-cols-1',
    sm: 'grid-cols-1',
    md: 'grid-cols-1',
    lg: 'grid-cols-2',
    xl: 'grid-cols-3',
    '2xl': 'grid-cols-4',
    '3xl': 'grid-cols-5',
    '4xl': 'grid-cols-6',
    '5xl': 'grid-cols-8'
  }
}

// Configuración por defecto completa
export const DEFAULT_CONFIG: DefaultConfig = {
  breakpoints: DEFAULT_BREAKPOINTS,
  spacing: DEFAULT_SPACING,
  typography: DEFAULT_TYPOGRAPHY,
  grid: DEFAULT_GRID
}

// Array de breakpoints ordenados
export const BREAKPOINT_ORDER: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl']

// Utilidad para obtener el breakpoint actual basado en el ancho
export const getCurrentBreakpoint = (width: number, breakpoints: BreakpointConfig): Breakpoint => {
  if (width >= breakpoints['5xl']) return '5xl'
  if (width >= breakpoints['4xl']) return '4xl'
  if (width >= breakpoints['3xl']) return '3xl'
  if (width >= breakpoints['2xl']) return '2xl'
  if (width >= breakpoints.xl) return 'xl'
  if (width >= breakpoints.lg) return 'lg'
  if (width >= breakpoints.md) return 'md'
  if (width >= breakpoints.sm) return 'sm'
  return 'xs'
}

// Utilidad para obtener el índice del breakpoint
export const getBreakpointIndex = (breakpoint: Breakpoint): number => {
  return BREAKPOINT_ORDER.indexOf(breakpoint)
}

// Utilidad para obtener el valor del breakpoint
export const getBreakpointValue = (breakpoint: Breakpoint, breakpoints: BreakpointConfig): number => {
  return breakpoints[breakpoint]
}
