// ========================================
// SISTEMA RESPONSIVE - FORMA PRINCIPAL
// ========================================

// Provider para configuración
export { ResponsiveProvider } from './providers/ResponsiveProvider'

// Componentes Wrapper (RECOMENDADO - Forma más simple y limpia)
export { 
  Container, 
  Heading, 
  Text, 
  Grid, 
  Card, 
  Button 
} from './components/responsive'

// Hook directo (Para usuarios avanzados)
export { useResponsive } from './hooks/useResponsive'

// ========================================
// EXPORTS AVANZADOS (OPCIONALES)
// ========================================

// Tipos
export * from './types/responsive'

// Constantes
export * from './constants/breakpoints'

// Utilidades
export * from './utils/responsiveUtils'

// Hooks avanzados (solo si necesitas configuración específica)
export { 
  useResponsiveConfig,
  useBreakpoints,
  useSpacing,
  useTypography,
  useGrid,
  useDebug
} from './hooks/useResponsiveConfig'

// HOC (solo para casos especiales como componentes de clase)
export { withResponsiveConfig } from './hocs/withResponsiveConfig'

// ========================================
// PÁGINAS DE EJEMPLO (OPCIONALES)
// ========================================

// Página de test completa
export { default as ResponsiveTestPage } from './pages/ResponsiveTestPage'

// Demo básico
export { default as ResponsiveDemo } from './components/ResponsiveDemo'

// Navegación de ejemplo
export { default as Navigation } from './components/Navigation'
