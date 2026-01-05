/**
 * CÓMO USAR ESTE SISTEMA:
 *
 * 1. Instala el plugin en tailwind.config.js:
 *    import responsiveScalePlugin from './src/plugin/responsiveScalePlugin.js'
 *    plugins: [responsiveScalePlugin()]
 *
 * 2. Usa el ResponsiveLayoutProvider + MainLayout:
 *    <ResponsiveLayoutProvider defaultLayout="default">
 *      <MainLayout>
 *        <App />
 *      </MainLayout>
 *    </ResponsiveLayoutProvider>
 *
 * 3. Selección de layout (múltiples opciones):
 *    - Por prop: <MainLayout layout="dashboard">...</MainLayout>
 *    - Por contexto: const { setLayout } = useResponsiveLayout(); setLayout('sidebar')
 *    - Por defaultLayout: <ResponsiveLayoutProvider defaultLayout="dashboard">
 *
 * 4. Hook responsivo personalizado (opcional):
 *    <ResponsiveLayoutProvider useResponsiveHook={tuHookPersonalizado}>
 *      ...
 *    </ResponsiveLayoutProvider>
 *
 * 5. Usa Tailwind NORMAL en tus páginas:
 *    <div className="p-6 text-base">
 *      TODO escala automáticamente + layout consistente
 *    </div>
 *
 * 6. (Opcional) Usa hooks para casos avanzados:
 *    const { layout, responsive } = useResponsiveLayout()
 */
export { ResponsiveLayoutProvider, ResponsiveProvider } from './providers';
export { MainLayout, DefaultLayout, SidebarLayout, DashboardLayout, MinimalLayout } from './layouts';
export { useResponsiveLayout, useLayout, useResponsive } from './hooks';
export { Header, Sidebar, Footer, Navigation } from './components/layout';
export { default as LayoutSwitcher } from './components/LayoutSwitcher';
export { useResponsiveLayoutContext, SidebarProvider, useSidebar, NavigationProvider, useNavigation } from './context';
export type { Breakpoint, Orientation, ResponsiveState, ResponsiveProviderProps } from './types/responsive';
export { DEFAULT_BREAKPOINTS, getCurrentBreakpoint, getBreakpointIndex, getBreakpointValue } from './constants/breakpoints';
export { LAYOUT_CONFIG, DEFAULT_LAYOUT, AVAILABLE_LAYOUTS } from './config/layout';
export type { LayoutConfig } from './config/layout';
//# sourceMappingURL=index.d.ts.map