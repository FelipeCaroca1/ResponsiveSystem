import type { Breakpoint } from '../types/responsive';
/**
 * Default breakpoint values
 * Deben coincidir con tailwind.config.js
 */
export declare const DEFAULT_BREAKPOINTS: Record<Breakpoint, number>;
/**
 * Get current breakpoint based on window width
 */
export declare const getCurrentBreakpoint: (width: number) => Breakpoint;
/**
 * Get breakpoint index (for comparisons)
 */
export declare const getBreakpointIndex: (breakpoint: Breakpoint) => number;
/**
 * Get breakpoint value in pixels
 */
export declare const getBreakpointValue: (breakpoint: Breakpoint) => number;
//# sourceMappingURL=breakpoints.d.ts.map