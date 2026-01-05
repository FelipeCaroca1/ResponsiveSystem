import type { ResponsiveState } from '../types/responsive';
import type { LayoutConfig } from '../config/layout';
export interface ResponsiveLayoutState {
    responsive: ResponsiveState;
    layout: {
        current: string;
        config: LayoutConfig;
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
}
declare const ResponsiveLayoutContext: import("react").Context<ResponsiveLayoutState | undefined>;
export declare const useResponsiveLayoutContext: () => ResponsiveLayoutState;
export { ResponsiveLayoutContext };
//# sourceMappingURL=ResponsiveLayoutContext.d.ts.map