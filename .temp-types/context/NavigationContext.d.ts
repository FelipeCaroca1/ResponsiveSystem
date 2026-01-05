import React from 'react';
interface NavigationContextType {
    currentPage: 'demo' | 'test';
    setCurrentPage: (page: 'demo' | 'test') => void;
}
export declare const useNavigation: () => NavigationContextType;
interface NavigationProviderProps {
    children: React.ReactNode;
    defaultPage?: 'demo' | 'test';
}
export declare const NavigationProvider: React.FC<NavigationProviderProps>;
export {};
//# sourceMappingURL=NavigationContext.d.ts.map