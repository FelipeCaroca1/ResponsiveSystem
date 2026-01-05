export interface LayoutConfig {
    name: string;
    description: string;
    components: string[];
    spacing: string;
    responsive: {
        mobile: string;
        tablet: string;
        desktop: string;
    };
}
export declare const LAYOUT_CONFIG: Record<string, LayoutConfig>;
export declare const DEFAULT_LAYOUT = "default";
export declare const AVAILABLE_LAYOUTS: string[];
//# sourceMappingURL=layout.d.ts.map