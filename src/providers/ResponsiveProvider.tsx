import React from 'react'
import type { ResponsiveProviderProps } from '../types/responsive'

/**
 * ResponsiveProvider - Provider simplificado para el sistema responsive
 * 
 * Nota: Con el sistema de auto-scaling mediante plugin de Tailwind,
 * este Provider es OPCIONAL y solo se necesita si quieres acceder
 * al hook useResponsive() en tus componentes.
 */
export const ResponsiveProvider: React.FC<ResponsiveProviderProps> = ({
  children,
  debug: _debug = false
}) => {
  // El Provider ahora solo envuelve children sin context
  // El auto-scaling funciona mediante el plugin de Tailwind
  return <>{children}</>
}
