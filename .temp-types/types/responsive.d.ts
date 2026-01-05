import type React from 'react';
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
export type Orientation = 'portrait' | 'landscape';
export interface ResponsiveState {
    breakpoint: Breakpoint;
    width: number;
    height: number;
    orientation: Orientation;
    isPortrait: boolean;
    isLandscape: boolean;
    isXs: boolean;
    isSm: boolean;
    isMd: boolean;
    isLg: boolean;
    isXl: boolean;
    is2Xl: boolean;
    is3Xl: boolean;
    is4Xl: boolean;
    is5Xl: boolean;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isSmall: boolean;
    isLarge: boolean;
    isUltraWide: boolean;
    is4K: boolean;
    is5K: boolean;
    isBreakpointUp: (breakpoint: Breakpoint) => boolean;
    isBreakpointDown: (breakpoint: Breakpoint) => boolean;
    isBreakpointBetween: (min: Breakpoint, max: Breakpoint) => boolean;
    isWidthUp: (width: number) => boolean;
    isWidthDown: (width: number) => boolean;
    isWidthBetween: (min: number, max: number) => boolean;
    isHeightUp: (height: number) => boolean;
    isHeightDown: (height: number) => boolean;
    isHeightBetween: (min: number, max: number) => boolean;
    debug: boolean;
}
export interface ResponsiveProviderProps {
    children: React.ReactNode;
    debug?: boolean;
}
//# sourceMappingURL=responsive.d.ts.map