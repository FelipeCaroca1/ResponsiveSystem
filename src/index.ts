// ========================================
// SISTEMA RESPONSIVE AUTO-SCALING + LAYOUTS
// ========================================

/**
 * CÓMO USAR ESTE SISTEMA:
 * 
 * 1. Instala el plugin en tailwind.config.js:
 *    import responsiveScalePlugin from './src/plugin/responsiveScalePlugin.js'
 *    plugins: [responsiveScalePlugin()]
 * 
 * 2. Usa el ResponsiveLayoutProvider + MainLayout:
 *    <ResponsiveLayoutProvider defaultLayout="default">
 *      <MainLayout layout="default">
 *        <App />
 *      </MainLayout>
 *    </ResponsiveLayoutProvider>
 * 
 * 3. Usa Tailwind NORMAL en tus páginas:
 *    <div className="p-6 text-base">
 *      TODO escala automáticamente + layout consistente
 *    </div>
 * 
 * 4. (Opcional) Usa hooks para casos avanzados:
 *    const { layout, responsive } = useResponsiveLayout()
 */

// ========================================
// EXPORTS PRINCIPALES
// ========================================

// Providers
export { ResponsiveLayoutProvider, ResponsiveProvider } from './providers'

// Layouts
export { 
  MainLayout,
  DefaultLayout, 
  SidebarLayout, 
  DashboardLayout, 
  MinimalLayout 
} from './layouts'

// Hooks
export { useResponsiveLayout, useLayout, useResponsive } from './hooks'

// Componentes de layout
export { Header, Sidebar, Footer, Navigation } from './components/layout'

// LayoutSwitcher
export { default as LayoutSwitcher } from './components/LayoutSwitcher'

// Context (para casos avanzados)
export { 
  useResponsiveLayoutContext, 
  SidebarProvider, 
  useSidebar,
  NavigationProvider,
  useNavigation
} from './context'

// Tipos TypeScript
export type { 
  Breakpoint,
  Orientation,
  ResponsiveState,
  ResponsiveProviderProps
} from './types/responsive'

// Constantes (para casos avanzados)
export { 
  DEFAULT_BREAKPOINTS,
  getCurrentBreakpoint,
  getBreakpointIndex,
  getBreakpointValue
} from './constants/breakpoints'

// Configuración de layouts
export { LAYOUT_CONFIG, DEFAULT_LAYOUT, AVAILABLE_LAYOUTS } from './config/layout'
export type { LayoutConfig } from './config/layout'

// Plugin de Tailwind (importar directamente en tailwind.config.js)
// import responsiveScalePlugin from './src/plugin/responsiveScalePlugin.js'

// ========================================
// EJEMPLOS (Solo para testing en este proyecto)
// ========================================

export { default as ResponsiveTestPage } from './pages/ResponsiveTestPage'
export { default as ResponsiveDemo } from './components/ResponsiveDemo'
