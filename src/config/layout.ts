export interface LayoutConfig {
  name: string
  description: string
  components: string[]
  spacing: string
  responsive: {
    mobile: string
    tablet: string
    desktop: string
  }
}

export const LAYOUT_CONFIG: Record<string, LayoutConfig> = {
  default: {
    name: 'Default',
    description: 'Navbar arriba, body central, footer abajo',
    components: ['Navigation', 'Footer'],
    spacing: 'p-4 md:p-6 lg:p-8',
    responsive: {
      mobile: 'p-4',
      tablet: 'p-6',
      desktop: 'p-8'
    }
  },
  sidebar: {
    name: 'Sidebar',
    description: 'Sidebar izquierda, contenido principal',
    components: ['Sidebar'],
    spacing: 'p-4 md:p-6',
    responsive: {
      mobile: 'p-4',
      tablet: 'p-6',
      desktop: 'p-6'
    }
  },
  dashboard: {
    name: 'Dashboard',
    description: 'Header + Sidebar + Main + Footer',
    components: ['Header', 'Sidebar', 'Footer'],
    spacing: 'p-4 md:p-6 lg:p-8',
    responsive: {
      mobile: 'p-4',
      tablet: 'p-6',
      desktop: 'p-8'
    }
  },
  minimal: {
    name: 'Minimal',
    description: 'Solo contenido, sin navegación',
    components: [],
    spacing: 'p-4 md:p-6',
    responsive: {
      mobile: 'p-4',
      tablet: 'p-6',
      desktop: 'p-6'
    }
  }
}

export const DEFAULT_LAYOUT = 'default'
export const AVAILABLE_LAYOUTS = Object.keys(LAYOUT_CONFIG)
