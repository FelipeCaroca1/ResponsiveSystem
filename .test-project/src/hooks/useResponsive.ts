import { useState, useEffect, useCallback, useMemo } from 'react'
import type { 
  ResponsiveState, 
  Breakpoint
} from '../types/responsive'
import { 
  getCurrentBreakpoint,
  getBreakpointIndex
} from '../constants/breakpoints'

/**
 * Debounce utility
 */
function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Get orientation based on dimensions
 */
function getOrientation(width: number, height: number): 'landscape' | 'portrait' {
  return width >= height ? 'landscape' : 'portrait'
}

/**
 * Hook principal useResponsive
 * Provee información sobre el breakpoint actual y helpers para responsive
 */
export const useResponsive = (): ResponsiveState => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  })

  // Función para actualizar dimensiones
  const updateDimensions = useCallback(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }, [])

  // Debounced update para optimizar performance
  const debouncedUpdateDimensions = useMemo(
    () => debounce(updateDimensions, 100),
    [updateDimensions]
  )

  // Effect para escuchar cambios de tamaño
  useEffect(() => {
    if (typeof window === 'undefined') return

    window.addEventListener('resize', debouncedUpdateDimensions)
    
    return () => {
      window.removeEventListener('resize', debouncedUpdateDimensions)
    }
  }, [debouncedUpdateDimensions])

  const { width, height } = dimensions

  // Calcular breakpoint actual
  const breakpoint = useMemo(() => getCurrentBreakpoint(width), [width])
  
  // Calcular orientación
  const orientation = useMemo(() => getOrientation(width, height), [width, height])

  // Helpers booleanos por breakpoint específico
  const isXs = breakpoint === 'xs'
  const isSm = breakpoint === 'sm'
  const isMd = breakpoint === 'md'
  const isLg = breakpoint === 'lg'
  const isXl = breakpoint === 'xl'
  const is2Xl = breakpoint === '2xl'
  const is3Xl = breakpoint === '3xl'
  const is4Xl = breakpoint === '4xl'
  const is5Xl = breakpoint === '5xl'

  // Helpers booleanos agrupados
  const isMobile = isXs || isSm
  const isTablet = isMd
  const isDesktop = isLg || isXl || is2Xl || is3Xl || is4Xl || is5Xl
  const isSmall = isXs || isSm || isMd
  const isLarge = isLg || isXl || is2Xl || is3Xl || is4Xl || is5Xl
  const isUltraWide = is3Xl || is4Xl || is5Xl
  const is4K = is4Xl || is5Xl
  const is5K = is5Xl

  // Helpers de orientación
  const isPortrait = orientation === 'portrait'
  const isLandscape = orientation === 'landscape'

  // Funciones de comparación de breakpoints
  const isBreakpointUp = useCallback((bp: Breakpoint): boolean => {
    return getBreakpointIndex(breakpoint) >= getBreakpointIndex(bp)
  }, [breakpoint])

  const isBreakpointDown = useCallback((bp: Breakpoint): boolean => {
    return getBreakpointIndex(breakpoint) <= getBreakpointIndex(bp)
  }, [breakpoint])

  const isBreakpointBetween = useCallback((min: Breakpoint, max: Breakpoint): boolean => {
    const current = getBreakpointIndex(breakpoint)
    return current >= getBreakpointIndex(min) && current <= getBreakpointIndex(max)
  }, [breakpoint])

  // Funciones de comparación de ancho
  const isWidthUp = useCallback((minWidth: number): boolean => {
    return width >= minWidth
  }, [width])

  const isWidthDown = useCallback((maxWidth: number): boolean => {
    return width <= maxWidth
  }, [width])

  const isWidthBetween = useCallback((minWidth: number, maxWidth: number): boolean => {
    return width >= minWidth && width <= maxWidth
  }, [width])

  // Funciones de comparación de altura
  const isHeightUp = useCallback((minHeight: number): boolean => {
    return height >= minHeight
  }, [height])

  const isHeightDown = useCallback((maxHeight: number): boolean => {
    return height <= maxHeight
  }, [height])

  const isHeightBetween = useCallback((minHeight: number, maxHeight: number): boolean => {
    return height >= minHeight && height <= maxHeight
  }, [height])

  // Debug mode
  const debug = false

  return {
    // Estado básico
    breakpoint,
    width,
    height,
    orientation,
    
    // Helpers booleanos específicos
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    is2Xl,
    is3Xl,
    is4Xl,
    is5Xl,
    
    // Helpers booleanos agrupados
    isMobile,
    isTablet,
    isDesktop,
    isSmall,
    isLarge,
    isUltraWide,
    is4K,
    is5K,
    
    // Helpers de orientación
    isPortrait,
    isLandscape,
    
    // Funciones de comparación
    isBreakpointUp,
    isBreakpointDown,
    isBreakpointBetween,
    isWidthUp,
    isWidthDown,
    isWidthBetween,
    isHeightUp,
    isHeightDown,
    isHeightBetween,
    
    // Debug
    debug
  }
}
