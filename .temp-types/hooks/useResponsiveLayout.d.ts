export declare const useResponsiveLayout: () => {
    layout: {
        current: string;
        config: import("..").LayoutConfig;
        setLayout: (layout: string) => void;
    };
    layoutUtils: {
        getContainerClass: () => string;
        getMainClass: () => string;
        hasSidebar: () => boolean;
        hasHeader: () => boolean;
        hasFooter: () => boolean;
        hasNavigation: () => boolean;
    };
    isDefaultLayout: () => boolean;
    isSidebarLayout: () => boolean;
    isDashboardLayout: () => boolean;
    isMinimalLayout: () => boolean;
    grid: {
        auto: (minWidth?: string) => string;
        responsive: (breakpoints: Record<string, number>) => string;
        fixed: (cols: number) => string;
    };
    spacing: {
        container: string;
        section: string;
        card: string;
        gap: string;
    };
    breakpoint: import("..").Breakpoint;
    width: number;
    height: number;
    orientation: import("..").Orientation;
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
    isBreakpointUp: (breakpoint: import("..").Breakpoint) => boolean;
    isBreakpointDown: (breakpoint: import("..").Breakpoint) => boolean;
    isBreakpointBetween: (min: import("..").Breakpoint, max: import("..").Breakpoint) => boolean;
    isWidthUp: (width: number) => boolean;
    isWidthDown: (width: number) => boolean;
    isWidthBetween: (min: number, max: number) => boolean;
    isHeightUp: (height: number) => boolean;
    isHeightDown: (height: number) => boolean;
    isHeightBetween: (min: number, max: number) => boolean;
    debug: boolean;
};
//# sourceMappingURL=useResponsiveLayout.d.ts.map