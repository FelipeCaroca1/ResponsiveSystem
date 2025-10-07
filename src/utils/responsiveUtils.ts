import type { 
  Breakpoint, 
  BreakpointConfig, 
  SpacingConfig, 
  ResponsiveClasses, 
  SpacingType,
  TextLevel,
  CardType,
  ResponsiveClassType,
  TypographyConfig,
  GridConfig
} from '../types/responsive'
import { DEFAULT_SPACING, DEFAULT_TYPOGRAPHY, DEFAULT_GRID } from '../constants/breakpoints'

// Utilidad para generar clases responsive de Tailwind
export const generateResponsiveClasses = (
  classes: ResponsiveClasses,
  breakpoints: BreakpointConfig
): string => {
  const result: string[] = []
  
  // Agregar clase base si existe
  if (classes.base) {
    result.push(classes.base)
  }
  
  // Agregar clases por breakpoint
  Object.entries(classes).forEach(([key, value]) => {
    if (key !== 'base' && value) {
      const breakpoint = key as Breakpoint
      if (breakpoint in breakpoints) {
        result.push(`${breakpoint}:${value}`)
      }
    }
  })
  
  return result.join(' ')
}

// Utilidad para obtener spacing responsive
export const getResponsiveSpacing = (
  _type: SpacingType,
  spacing: SpacingConfig = DEFAULT_SPACING
): string => {
  return Object.entries(spacing)
    .map(([breakpoint, value]) => {
      if (breakpoint === 'xs') {
        return value
      }
      return `${breakpoint}:${value}`
    })
    .join(' ')
}

// Utilidad para obtener tipografía responsive
export const getResponsiveText = (
  level: TextLevel,
  typography: TypographyConfig = DEFAULT_TYPOGRAPHY
): string => {
  const textConfig = typography[level]
  
  return Object.entries(textConfig)
    .map(([breakpoint, value]) => {
      if (breakpoint === 'xs') {
        return value
      }
      return `${breakpoint}:${value}`
    })
    .join(' ')
}

// Utilidad para obtener grid responsive
export const getResponsiveGrid = (
  config: Record<Breakpoint, string>
): string => {
  return Object.entries(config)
    .map(([breakpoint, value]) => {
      if (breakpoint === 'xs') {
        return value
      }
      return `${breakpoint}:${value}`
    })
    .join(' ')
}

// Utilidad para obtener grid de cards
export const getCardGrid = (
  type: CardType = 'medium',
  grid: GridConfig = DEFAULT_GRID
): string => {
  const cardGrid = grid[type]
  return getResponsiveGrid(cardGrid)
}

// Utilidad para obtener clases predefinidas
export const getResponsiveClass = (
  type: ResponsiveClassType
): string => {
  const predefinedClasses = {
    container: 'w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 3xl:px-24 4xl:px-32 5xl:px-40',
    button: 'px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-6 lg:py-3 xl:px-6 xl:py-3 2xl:px-6 2xl:py-3 3xl:px-6 3xl:py-3 4xl:px-6 4xl:py-3 5xl:px-6 5xl:py-3',
    card: 'p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-16 3xl:p-20 4xl:p-24 5xl:p-32',
    input: 'px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 lg:px-8 lg:py-5 xl:px-10 xl:py-6',
    grid: 'grid gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 3xl:gap-20 4xl:gap-24 5xl:gap-32'
  }
  
  return predefinedClasses[type]
}

// Utilidad para comparar breakpoints
export const compareBreakpoints = (
  current: Breakpoint,
  target: Breakpoint,
  breakpoints: BreakpointConfig
): 'equal' | 'greater' | 'less' => {
  const currentValue = breakpoints[current]
  const targetValue = breakpoints[target]
  
  if (currentValue === targetValue) return 'equal'
  if (currentValue > targetValue) return 'greater'
  return 'less'
}

// Utilidad para verificar si un breakpoint es mayor o igual
export const isBreakpointUp = (
  current: Breakpoint,
  target: Breakpoint,
  breakpoints: BreakpointConfig
): boolean => {
  return compareBreakpoints(current, target, breakpoints) !== 'less'
}

// Utilidad para verificar si un breakpoint es menor
export const isBreakpointDown = (
  current: Breakpoint,
  target: Breakpoint,
  breakpoints: BreakpointConfig
): boolean => {
  return compareBreakpoints(current, target, breakpoints) === 'less'
}

// Utilidad para verificar si está entre dos breakpoints
export const isBreakpointBetween = (
  current: Breakpoint,
  min: Breakpoint,
  max: Breakpoint,
  breakpoints: BreakpointConfig
): boolean => {
  return isBreakpointUp(current, min, breakpoints) && isBreakpointDown(current, max, breakpoints)
}

// Utilidad para verificar dimensiones
export const isWidthUp = (width: number, targetWidth: number): boolean => {
  return width >= targetWidth
}

export const isWidthDown = (width: number, targetWidth: number): boolean => {
  return width < targetWidth
}

export const isWidthBetween = (width: number, min: number, max: number): boolean => {
  return width >= min && width < max
}

// Utilidad para obtener orientación
export const getOrientation = (width: number, height: number): 'portrait' | 'landscape' => {
  return width > height ? 'landscape' : 'portrait'
}

// Utilidad para debounce (para optimizar re-renders)
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

// Utilidad para throttle (alternativa al debounce)
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}
