import { useState, useEffect, useCallback, useMemo } from 'react'
import type { 
  ResponsiveState, 
  Breakpoint, 
  SpacingType, 
  TextLevel, 
  CardType, 
  ResponsiveClassType,
  ResponsiveClasses,
  SpacingConfig
} from '../types/responsive'
import { 
  DEFAULT_BREAKPOINTS, 
  DEFAULT_SPACING, 
  DEFAULT_TYPOGRAPHY, 
  DEFAULT_GRID,
  getCurrentBreakpoint,
  getBreakpointIndex,
  getBreakpointValue
} from '../constants/breakpoints'
import {
  generateResponsiveClasses,
  getResponsiveSpacing,
  getResponsiveText,
  getResponsiveGrid,
  getCardGrid,
  getResponsiveClass,
  isBreakpointUp,
  isBreakpointDown,
  isBreakpointBetween,
  isWidthUp,
  isWidthDown,
  isWidthBetween,
  getOrientation,
  debounce
} from '../utils/responsiveUtils'

// Hook principal useResponsive
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
    window.addEventListener('orientationchange', debouncedUpdateDimensions)

    return () => {
      window.removeEventListener('resize', debouncedUpdateDimensions)
      window.removeEventListener('orientationchange', debouncedUpdateDimensions)
    }
  }, [debouncedUpdateDimensions])

  // Calcular breakpoint actual
  const breakpoint = useMemo(() => 
    getCurrentBreakpoint(dimensions.width, DEFAULT_BREAKPOINTS),
    [dimensions.width]
  )

  const breakpointValue = useMemo(() => 
    getBreakpointValue(breakpoint, DEFAULT_BREAKPOINTS),
    [breakpoint]
  )

  const breakpointIndex = useMemo(() => 
    getBreakpointIndex(breakpoint),
    [breakpoint]
  )

  // Helpers booleanos específicos
  const isXs = breakpoint === 'xs'
  const isSm = breakpoint === 'sm'
  const isMd = breakpoint === 'md'
  const isLg = breakpoint === 'lg'
  const isXl = breakpoint === 'xl'
  const is2Xl = breakpoint === '2xl'
  const is3Xl = breakpoint === '3xl'
  const is4Xl = breakpoint === '4xl'
  const is5Xl = breakpoint === '5xl'

  // Helpers agrupados
  const isMobile = isXs || isSm
  const isTablet = isMd
  const isDesktop = isLg || isXl || is2Xl || is3Xl || is4Xl || is5Xl
  const isSmall = isMobile || isTablet
  const isLarge = isDesktop
  const isUltraWide = is3Xl || is4Xl || is5Xl
  const is4K = is4Xl || is5Xl
  const is5K = is5Xl

  // Orientación
  const orientation = useMemo(() => 
    getOrientation(dimensions.width, dimensions.height),
    [dimensions.width, dimensions.height]
  )

  const isPortrait = orientation === 'portrait'
  const isLandscape = orientation === 'landscape'

  // Funciones de comparación
  const isBreakpointFn = useCallback((targetBreakpoint: Breakpoint) => 
    breakpoint === targetBreakpoint,
    [breakpoint]
  )

  const isBreakpointUpFn = useCallback((targetBreakpoint: Breakpoint) => 
    isBreakpointUp(breakpoint, targetBreakpoint, DEFAULT_BREAKPOINTS),
    [breakpoint]
  )

  const isBreakpointDownFn = useCallback((targetBreakpoint: Breakpoint) => 
    isBreakpointDown(breakpoint, targetBreakpoint, DEFAULT_BREAKPOINTS),
    [breakpoint]
  )

  const isBreakpointBetweenFn = useCallback((min: Breakpoint, max: Breakpoint) => 
    isBreakpointBetween(breakpoint, min, max, DEFAULT_BREAKPOINTS),
    [breakpoint]
  )

  const isWidthFn = useCallback((width: number) => 
    dimensions.width === width,
    [dimensions.width]
  )

  const isWidthUpFn = useCallback((width: number) => 
    isWidthUp(dimensions.width, width),
    [dimensions.width]
  )

  const isWidthDownFn = useCallback((width: number) => 
    isWidthDown(dimensions.width, width),
    [dimensions.width]
  )

  const isWidthBetweenFn = useCallback((min: number, max: number) => 
    isWidthBetween(dimensions.width, min, max),
    [dimensions.width]
  )

  // Utilidades de Tailwind
  const getResponsiveClassFn = useCallback((type: ResponsiveClassType) => 
    getResponsiveClass(type),
    []
  )

  const getResponsiveClassesFn = useCallback((classes: ResponsiveClasses) => 
    generateResponsiveClasses(classes, DEFAULT_BREAKPOINTS),
    []
  )

  const getSpacingFn = useCallback((type: SpacingType) => 
    getResponsiveSpacing(type, DEFAULT_SPACING),
    []
  )

  const getResponsiveSpacingFn = useCallback((config: SpacingConfig) => 
    getResponsiveGrid(config),
    []
  )

  const getTextSizeFn = useCallback((level: TextLevel) => 
    getResponsiveText(level, DEFAULT_TYPOGRAPHY),
    []
  )

  const getResponsiveTextFn = useCallback((config: SpacingConfig) => 
    getResponsiveGrid(config),
    []
  )

  const getCardGridFn = useCallback((type: CardType = 'medium') => 
    getCardGrid(type, DEFAULT_GRID),
    []
  )

  const getResponsiveGridFn = useCallback((config: Record<Breakpoint, string>) => 
    getResponsiveGrid(config),
    []
  )

  // Debug info
  const debug = useMemo(() => ({
    breakpoint,
    width: dimensions.width,
    height: dimensions.height,
    orientation,
    timestamp: Date.now()
  }), [breakpoint, dimensions.width, dimensions.height, orientation])

  // Retornar el estado completo
  return {
    // Breakpoint actual
    breakpoint,
    breakpointValue,
    breakpointIndex,
    
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
    
    // Helpers agrupados
    isMobile,
    isTablet,
    isDesktop,
    isSmall,
    isLarge,
    isUltraWide,
    is4K,
    is5K,
    
    // Dimensiones
    width: dimensions.width,
    height: dimensions.height,
    viewportWidth: dimensions.width,
    viewportHeight: dimensions.height,
    
    // Orientación
    orientation,
    isPortrait,
    isLandscape,
    
    // Funciones de comparación
    isBreakpoint: isBreakpointFn,
    isBreakpointUp: isBreakpointUpFn,
    isBreakpointDown: isBreakpointDownFn,
    isBreakpointBetween: isBreakpointBetweenFn,
    isWidth: isWidthFn,
    isWidthUp: isWidthUpFn,
    isWidthDown: isWidthDownFn,
    isWidthBetween: isWidthBetweenFn,
    
    // Utilidades de Tailwind
    getResponsiveClass: getResponsiveClassFn,
    getResponsiveClasses: getResponsiveClassesFn,
    getSpacing: getSpacingFn,
    getResponsiveSpacing: getResponsiveSpacingFn,
    getTextSize: getTextSizeFn,
    getResponsiveText: getResponsiveTextFn,
    getCardGrid: getCardGridFn,
    getResponsiveGrid: getResponsiveGridFn,
    
    // Debug
    debug
  }
}
