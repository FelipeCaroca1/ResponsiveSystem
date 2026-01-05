export declare const useLayout: () => {
    isDefaultLayout: boolean;
    isSidebarLayout: boolean;
    isDashboardLayout: boolean;
    isMinimalLayout: boolean;
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
    getContainerClass: () => string;
    getMainClass: () => string;
    hasSidebar: () => boolean;
    hasHeader: () => boolean;
    hasFooter: () => boolean;
    hasNavigation: () => boolean;
    current: string;
    config: import("..").LayoutConfig;
    setLayout: (layout: string) => void;
};
//# sourceMappingURL=useLayout.d.ts.map