import { useResponsiveLayout } from './index'

export const useLayout = () => {
  const responsiveLayout = useResponsiveLayout()
  
  return {
    // Layout actual
    current: responsiveLayout.layout.current,
    config: responsiveLayout.layout.config,
    setLayout: responsiveLayout.layout.setLayout,
    
    // Utilidades
    ...responsiveLayout.layoutUtils,
    
    // Helpers específicos
    isDefaultLayout: responsiveLayout.isDefaultLayout(),
    isSidebarLayout: responsiveLayout.isSidebarLayout(),
    isDashboardLayout: responsiveLayout.isDashboardLayout(),
    isMinimalLayout: responsiveLayout.isMinimalLayout(),
    
    // Grid helpers
    grid: responsiveLayout.grid,
    
    // Spacing helpers
    spacing: responsiveLayout.spacing,
  }
}
