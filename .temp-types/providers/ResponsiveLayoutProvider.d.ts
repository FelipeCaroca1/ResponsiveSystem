import React from 'react';
import type { ResponsiveState } from '../types/responsive';
interface ResponsiveLayoutProviderProps {
    children: React.ReactNode;
    defaultLayout?: string;
    /**
     * Hook responsivo personalizado del proyecto consumidor.
     * Si se proporciona, se usará en lugar del hook interno del paquete.
     * Debe retornar un objeto compatible con ResponsiveState.
     */
    useResponsiveHook?: () => ResponsiveState;
}
export declare const ResponsiveLayoutProvider: React.FC<ResponsiveLayoutProviderProps>;
export {};
//# sourceMappingURL=ResponsiveLayoutProvider.d.ts.map