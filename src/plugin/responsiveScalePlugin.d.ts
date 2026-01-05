/**
 * Responsive Scale Plugin for Tailwind CSS
 * Auto-scales typography, spacing, line-height, letter-spacing, and shadows across all breakpoints
 */

export interface ScaleProperties {
  typography?: boolean
  spacing?: boolean
  lineHeight?: boolean
  letterSpacing?: boolean
  shadows?: boolean
  borderWidth?: boolean
  sizing?: boolean
  borderRadius?: boolean
}

export interface Scales {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  '2xl'?: number
  '3xl'?: number
  '4xl'?: number
  '5xl'?: number
}

export interface Breakpoints {
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  '2xl'?: string
  '3xl'?: string
  '4xl'?: string
  '5xl'?: string
}

export interface ResponsiveScalePluginConfig {
  scaleProperties?: ScaleProperties
  scales?: Scales
  breakpoints?: Breakpoints
}

declare function responsiveScalePlugin(
  config?: ResponsiveScalePluginConfig
): any

export default responsiveScalePlugin
export const defaultConfig: {
  scaleProperties: Required<ScaleProperties>
  scales: Required<Scales>
  breakpoints: Required<Breakpoints>
}

