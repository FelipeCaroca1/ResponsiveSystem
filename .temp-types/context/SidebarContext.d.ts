import React from 'react';
interface SidebarContextType {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}
export declare const SidebarProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useSidebar: () => SidebarContextType;
export {};
//# sourceMappingURL=SidebarContext.d.ts.map