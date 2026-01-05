import React from 'react';
interface MainLayoutProps {
    children: React.ReactNode;
    /**
     * Layout específico a usar. Si se proporciona, sobrescribe el layout del contexto.
     * Valores posibles: 'default', 'sidebar', 'dashboard', 'minimal'
     */
    layout?: 'default' | 'sidebar' | 'dashboard' | 'minimal';
}
declare const MainLayout: React.FC<MainLayoutProps>;
export default MainLayout;
//# sourceMappingURL=MainLayout.d.ts.map