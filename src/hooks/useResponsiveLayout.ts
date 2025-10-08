import { useResponsiveLayoutContext } from '../context'

export const useResponsiveLayout = () => {
  const context = useResponsiveLayoutContext()
  
  return {
    // Todo el sistema responsivo original
    ...context.responsive,
    
    // Sistema de layout
    layout: {
      current: context.layout.current,
      config: context.layout.config,
      setLayout: context.layout.setLayout,
    },
    
    // Utilidades de layout
    layoutUtils: context.layoutUtils,
    
    // Helpers específicos del layout
    isDefaultLayout: () => context.layout.current === 'default',
    isSidebarLayout: () => context.layout.current === 'sidebar',
    isDashboardLayout: () => context.layout.current === 'dashboard',
    isMinimalLayout: () => context.layout.current === 'minimal',
    
    // Grid helpers que usan el sistema auto-escalable
    grid: {
      auto: (minWidth = 'md') => `grid-cols-auto-${minWidth}`,
      responsive: (breakpoints: Record<string, number>) => {
        const classes: string[] = []
        Object.entries(breakpoints).forEach(([breakpoint, cols]) => {
          if (breakpoint === 'base') {
            classes.push(`grid-cols-${cols}`)
          } else {
            classes.push(`${breakpoint}:grid-cols-${cols}`)
          }
        })
        return classes.join(' ')
      },
      fixed: (cols: number) => `grid-cols-${cols}`,
    },
    
    // Spacing helpers que escalan automáticamente
    spacing: {
      container: context.layoutUtils.getContainerClass(),
      section: 'mb-6',
      card: 'p-6',
      gap: 'gap-4',
    },
  }
}
