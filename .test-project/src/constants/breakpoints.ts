import type { Breakpoint } from '../types/responsive'

/**
 * Default breakpoint values
 * Deben coincidir con tailwind.config.js
 */
export const DEFAULT_BREAKPOINTS: Record<Breakpoint, number> = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
  '4xl': 2560,
  '5xl': 3840
}

/**
 * Get current breakpoint based on window width
 */
export const getCurrentBreakpoint = (width: number): Breakpoint => {
  if (width >= DEFAULT_BREAKPOINTS['5xl']) return '5xl'
  if (width >= DEFAULT_BREAKPOINTS['4xl']) return '4xl'
  if (width >= DEFAULT_BREAKPOINTS['3xl']) return '3xl'
  if (width >= DEFAULT_BREAKPOINTS['2xl']) return '2xl'
  if (width >= DEFAULT_BREAKPOINTS.xl) return 'xl'
  if (width >= DEFAULT_BREAKPOINTS.lg) return 'lg'
  if (width >= DEFAULT_BREAKPOINTS.md) return 'md'
  if (width >= DEFAULT_BREAKPOINTS.sm) return 'sm'
  return 'xs'
}

/**
 * Get breakpoint index (for comparisons)
 */
export const getBreakpointIndex = (breakpoint: Breakpoint): number => {
  const breakpoints: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl']
  return breakpoints.indexOf(breakpoint)
}

/**
 * Get breakpoint value in pixels
 */
export const getBreakpointValue = (breakpoint: Breakpoint): number => {
  return DEFAULT_BREAKPOINTS[breakpoint]
}

