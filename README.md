# Sistema Responsive para React + Tailwind

Sistema simple para manejar responsividad en React con Tailwind CSS, sin media queries. Maneja todos los breakpoints desde móviles hasta pantallas 4K.

## 🎯 Características

- ✅ **Componentes Wrapper** - Sin concatenación de strings
- ✅ **9 breakpoints** - xs(475px) a 5xl(3840px)
- ✅ **100% Tailwind CSS** - Sin estilos inline
- ✅ **TypeScript completo** - Tipado robusto
- ✅ **Escalado automático** - Se adapta a cualquier pantalla

## 🚀 Instalación y Uso

### 1. Instalar
```bash
npm install @tu-org/responsive-system
```

### 2. Configurar Provider
```tsx
import { ResponsiveProvider } from '@tu-org/responsive-system'

function App() {
  return (
    <ResponsiveProvider>
      <MyApp />
    </ResponsiveProvider>
  )
}
```

### 3. Usar Componentes (RECOMENDADO)
```tsx
import { Container, Heading, Text, Grid, Card, Button } from '@tu-org/responsive-system'

function MyComponent() {
  return (
    <Container>
      <Heading level="h1" className="text-blue-600">
        Título Responsive
      </Heading>
      
      <Grid type="medium" gap="4">
        <Card className="bg-white rounded-lg shadow-md">
          <Heading level="h3">Card 1</Heading>
          <Text>Contenido que escala automáticamente</Text>
        </Card>
        
        <Card className="bg-white rounded-lg shadow-md">
          <Heading level="h3">Card 2</Heading>
          <Text>Sin concatenación de strings</Text>
        </Card>
      </Grid>
      
      <Button className="bg-blue-500 text-white rounded-lg">
        Botón Responsive
      </Button>
    </Container>
  )
}
```

### 4. Usar Hook (Avanzado)
```tsx
import { useResponsive } from '@tu-org/responsive-system'

function MyComponent() {
  const { breakpoint, isMobile, width } = useResponsive()
  
  return (
    <div>
      <p>Breakpoint: {breakpoint}</p>
      <p>Ancho: {width}px</p>
      {isMobile && <p>Vista móvil</p>}
    </div>
  )
}
```

## 📦 Componentes

### Container
```tsx
<Container className="bg-white">Content</Container>
// Props: as?, className?
```

### Heading
```tsx
<Heading level="h1" className="text-center">Title</Heading>
// Props: level ('h1'|'h2'|'h3'|'h4'), className?
```

### Text
```tsx
<Text size="body" className="text-gray-600">Content</Text>
// Props: size ('body'|'caption'), as?, className?
```

### Grid
```tsx
<Grid type="medium" gap="4">Cards...</Grid>
// Props: type ('small'|'medium'|'large'), gap?, className?
```

### Card
```tsx
<Card className="bg-white rounded-lg">Content</Card>
// Props: className?
```

### Button
```tsx
<Button onClick={handleClick} className="bg-blue-500">Click</Button>
// Props: onClick?, type?, disabled?, className?
```

## 🛠️ Hook useResponsive

### Estado Responsive
```tsx
const { 
  breakpoint,   // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
  width,        // número
  height,       // número
  orientation,  // 'portrait' | 'landscape'
  debug         // boolean
} = useResponsive()
```

### Helpers Booleanos
```tsx
const { 
  // Breakpoints específicos
  isXs, isSm, isMd, isLg, isXl, is2Xl, is3Xl, is4Xl, is5Xl,
  
  // Categorías
  isMobile,     // < 768px
  isTablet,     // 768px - 1023px
  isDesktop,    // >= 1024px
  isSmall,      // < 1024px
  isLarge,      // >= 1024px
  isUltraWide,  // >= 1920px
  is4K,         // >= 2560px
  is5K          // >= 3840px
} = useResponsive()
```

### Funciones de Comparación
```tsx
const { 
  isBreakpointUp,      // isBreakpointUp('md')
  isBreakpointDown,    // isBreakpointDown('lg')
  isBreakpointBetween, // isBreakpointBetween('sm', 'xl')
  isWidthUp,           // isWidthUp(1024)
  isWidthDown,         // isWidthDown(768)
  isWidthBetween       // isWidthBetween(500, 1200)
} = useResponsive()
```

### Funciones de Utilidades (Solo para casos avanzados)
```tsx
const { 
  getSpacing,         // getSpacing('padding')
  getTextSize,        // getTextSize('h1')
  getCardGrid,        // getCardGrid('medium')
  getResponsiveClass  // getResponsiveClass('button')
} = useResponsive()
```

## 📱 Breakpoints

| Nombre | Tamaño | Descripción |
|--------|--------|-------------|
| xs | 475px | Móvil pequeño |
| sm | 640px | Móvil grande |
| md | 768px | Tablet |
| lg | 1024px | Laptop |
| xl | 1280px | Desktop |
| 2xl | 1536px | Desktop grande |
| 3xl | 1920px | Full HD |
| 4xl | 2560px | 2K/QHD |
| 5xl | 3840px | 4K/UHD |

## 🎨 Configuración Personalizada

```tsx
<ResponsiveProvider
  breakpoints={{
    xs: 475,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
    '3xl': 1920,
    '4xl': 2560,
    '5xl': 3840
  }}
  debug={true}
>
  <App />
</ResponsiveProvider>
```

## 🔧 Casos Especiales

### HOC para Componentes de Clase
```tsx
import { withResponsiveConfig } from '@tu-org/responsive-system'

class MyComponent extends React.Component {
  render() {
    const { breakpoints } = this.props.responsiveConfig
    return <div>Breakpoint xs: {breakpoints.xs}px</div>
  }
}

export default withResponsiveConfig(MyComponent)
```

### Hooks Específicos
```tsx
import { 
  useBreakpoints,
  useSpacing,
  useTypography,
  useGrid,
  useDebug
} from '@tu-org/responsive-system'
```

## 📁 Estructura

```
src/
├── components/responsive/    # Componentes wrapper
│   ├── Container.tsx
│   ├── Heading.tsx
│   ├── Text.tsx
│   ├── Grid.tsx
│   ├── Card.tsx
│   └── Button.tsx
├── hooks/
│   ├── useResponsive.ts      # Hook principal
│   └── useResponsiveConfig.ts
├── providers/
│   └── ResponsiveProvider.tsx
├── types/
│   └── responsive.ts
├── constants/
│   └── breakpoints.ts
├── utils/
│   └── responsiveUtils.ts
└── index.ts
```

## 📦 Instalación en Proyecto Nuevo

```bash
# 1. Crear proyecto
npm create vite@latest my-app -- --template react-ts

# 2. Instalar Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3. Configurar Tailwind (tailwind.config.js)
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        '3xl': '1920px',
        '4xl': '2560px',
        '5xl': '3840px',
      }
    },
  },
}

# 4. Instalar sistema responsive
npm install @tu-org/responsive-system
```

## 🎯 Ejemplo Completo

```tsx
import { ResponsiveProvider, Container, Heading, Text, Grid, Card, Button, useResponsive } from '@tu-org/responsive-system'

function MyPage() {
  const { isMobile, breakpoint } = useResponsive()
  
  return (
    <Container className="min-h-screen bg-gray-50">
      <header className="mb-8">
        <Heading level="h1" className="text-center text-blue-600">
          Mi Aplicación Responsive
        </Heading>
        <Text className="text-center text-gray-600">
          Breakpoint actual: {breakpoint}
        </Text>
      </header>

      <Grid type="medium" gap="6">
        <Card className="bg-white rounded-lg shadow-md">
          <Heading level="h3">Feature 1</Heading>
          <Text>Descripción de la característica</Text>
          <Button className="mt-4 bg-blue-500 text-white rounded-lg">
            Ver más
          </Button>
        </Card>

        <Card className="bg-white rounded-lg shadow-md">
          <Heading level="h3">Feature 2</Heading>
          <Text>Descripción de la característica</Text>
          <Button className="mt-4 bg-blue-500 text-white rounded-lg">
            Ver más
          </Button>
        </Card>
      </Grid>

      {isMobile && <Text className="mt-4">Vista móvil activa</Text>}
    </Container>
  )
}

function App() {
  return (
    <ResponsiveProvider>
      <MyPage />
    </ResponsiveProvider>
  )
}
```

## 🚀 Estado del Proyecto

- ✅ Sistema responsive completo
- ✅ 6 componentes wrapper listos
- ✅ Layout optimizado sin desbordamiento
- ✅ TypeScript completo sin errores
- ✅ 0 errores de linting
- ✅ Performance optimizada
- ✅ Listo para producción

## 🤝 Espero te sea de utilidad
