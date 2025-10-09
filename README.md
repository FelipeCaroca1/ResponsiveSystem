# 🎯 Responsive System - Auto-Scaling para Tailwind CSS

**Sistema de escalado automático para todas las pantallas.** Usa Tailwind CSS normal, TODO escala automáticamente.

## ✨ Características

- ✅ **100% Automático**: Instala, configura una vez, olvídate del responsive
- ✅ **Tailwind Normal**: Usa `text-base`, `p-4`, `gap-6`, `leading-relaxed`, `shadow-lg` como siempre
- ✅ **Auto-Scaling Completo**: Typography, spacing, line-height, letter-spacing y shadows
- ✅ **Sistema de Layouts**: 4 layouts predefinidos (Default, Sidebar, Dashboard, Minimal)
- ✅ **9 Breakpoints**: xs, sm, md, lg, xl, 2xl, 3xl (1920px), 4xl (2560px), 5xl (3840px)
- ✅ **TypeScript**: 100% type-safe
- ✅ **Zero Dependencies**: Solo Tailwind CSS
- ✅ **No Invasivo**: Instala solo lo que necesites ([Ver guía](INSTALLATION.md))

---

## 📦 ¿Tenés un proyecto existente?

**Este sistema NO es invasivo.** Podés instalarlo de 3 formas:

1. **Solo el plugin** (1 archivo) - Auto-scaling sin tocar tu código
2. **Con hooks** (~8 archivos) - Detección de breakpoints en JS
3. **Sistema completo** (~30 archivos) - Layouts incluidos

👉 **[Ver guía completa de instalación](INSTALLATION.md)**

---

## 🚀 Instalación Rápida (Proyecto Nuevo)

### **1. Configura el Plugin en Tailwind**

```js
// tailwind.config.js
import responsiveScalePlugin from './src/plugin/responsiveScalePlugin.js'

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs': '475px', 'sm': '640px', 'md': '768px', 'lg': '1024px',
        'xl': '1280px', '2xl': '1536px', '3xl': '1920px', '4xl': '2560px', '5xl': '3840px'
      }
    },
  },
  plugins: [
    responsiveScalePlugin({
      scaleProperties: {
        typography: true,      // font-size
        spacing: true,         // padding, margin, gap
        lineHeight: true,      // line-height
        letterSpacing: true,   // letter-spacing
        shadows: true,         // box-shadow
        borderWidth: false,
        sizing: false,
        borderRadius: false
      },
      scales: {
        xs: 1.0, sm: 1.0, md: 1.0, lg: 1.0, xl: 1.0,
        '2xl': 1.05, '3xl': 1.15, '4xl': 1.25, '5xl': 1.35
      }
    })
  ],
}
```

### **2. Configura el Sistema de Layouts**

```tsx
// App.tsx
import { ResponsiveLayoutProvider, MainLayout } from './index'

function App() {
  return (
    <ResponsiveLayoutProvider defaultLayout="default">
      <MainLayout>
        <YourContent />
      </MainLayout>
    </ResponsiveLayoutProvider>
  )
}
```

---

## 🎨 Cómo Funciona

### **Sistema Responsivo (Auto-Scaling)**

El plugin genera CSS variables que escalan automáticamente:

```css
/* Plugin genera automáticamente */
:root { --scale-text: 1.0; --scale-spacing: 1.0; }

.text-base { font-size: calc(1rem * var(--scale-text)); }
.p-4 { padding: calc(1rem * var(--scale-spacing)); }
```

**En 1920px (3xl):** `--scale-text: 1.15` → `text-base` = 18.4px

### **Sistema de Layouts**

**4 Layouts Predefinidos:**

| Layout | Componentes | Uso |
|--------|-------------|-----|
| `default` | Navigation + Footer | Páginas estáticas |
| `sidebar` | Sidebar | Apps con navegación lateral |
| `dashboard` | Header + Sidebar + Footer | Dashboards complejos |
| `minimal` | Solo contenido | Landing pages |

**Cambio Dinámico:**
```tsx
import { useLayout } from './hooks'

function MyComponent() {
  const { setLayout } = useLayout()
  
  return (
    <button onClick={() => setLayout('dashboard')}>
      Cambiar a Dashboard
    </button>
  )
}
```

---

## 📊 Breakpoints y Escalas

| Breakpoint | Tamaño | Factor | Ejemplo `text-base` |
|------------|--------|--------|---------------------|
| `xs` | 475px+ | 1.0 | 16px |
| `sm` | 640px+ | 1.0 | 16px |
| `md` | 768px+ | 1.0 | 16px |
| `lg` | 1024px+ | 1.0 | 16px |
| `xl` | 1280px+ | 1.0 | 16px |
| `2xl` | 1536px+ | 1.05 | 16.8px |
| `3xl` | 1920px+ | 1.15 | 18.4px |
| `4xl` | 2560px+ | 1.25 | 20px |
| `5xl` | 3840px+ | 1.35 | 21.6px |

---

## 🔧 Uso del Hook

```tsx
import { useResponsiveLayout } from './hooks'

function MyComponent() {
  const { 
    // Estado responsivo
    breakpoint, width, height, isMobile, isDesktop,
    // Estado del layout
    layout: { current, setLayout },
    // Utilidades
    layoutUtils
  } = useResponsiveLayout()
  
  return (
    <div className="p-6"> {/* ✅ Escala automáticamente */}
      <h1 className="text-4xl">Título</h1> {/* ✅ Escala automáticamente */}
      
      {/* Renderizado condicional */}
      {isMobile && <MobileMenu />}
      {isDesktop && <DesktopSidebar />}
      
      {/* Cambio de layout */}
      <button onClick={() => setLayout('sidebar')}>
        Cambiar Layout
      </button>
    </div>
  )
}
```

---

## 🎯 Qué Escala Automáticamente

### ✅ **SÍ Escala:**
- **Typography**: `text-base`, `text-lg`, `text-xl`, etc.
- **Spacing**: `p-4`, `m-6`, `gap-3`, `space-y-2`
- **Line Height**: `leading-relaxed`, `leading-loose`
- **Letter Spacing**: `tracking-tight`, `tracking-wide`
- **Shadows**: `shadow-lg`, `shadow-xl`

### ❌ **NO Escala:**
- **Sizing**: `w-64`, `h-32` (puede romper layouts)
- **Border Radius**: `rounded-lg` (mantiene proporciones)
- **Valores Arbitrarios**: `text-[16px]`, `p-[10px]`

---

## 📱 Layouts en Acción

### **Default Layout**
```tsx
import { ResponsiveLayoutProvider, MainLayout } from './index'

<ResponsiveLayoutProvider defaultLayout="default">
  <MainLayout>
    {/* Navigation arriba, Footer abajo */}
    <YourContent />
  </MainLayout>
</ResponsiveLayoutProvider>
```

### **Sidebar Layout**
```tsx
import { ResponsiveLayoutProvider, MainLayout } from './index'

<ResponsiveLayoutProvider defaultLayout="sidebar">
  <MainLayout>
    {/* Sidebar izquierda, contenido principal */}
    <YourContent />
  </MainLayout>
</ResponsiveLayoutProvider>
```

### **Dashboard Layout**
```tsx
import { ResponsiveLayoutProvider, MainLayout } from './index'

<ResponsiveLayoutProvider defaultLayout="dashboard">
  <MainLayout>
    {/* Header + Sidebar + Main + Footer */}
    <YourContent />
  </MainLayout>
</ResponsiveLayoutProvider>
```

---

## 🏗️ Estructura del Proyecto

```
src/
├── plugin/
│   └── responsiveScalePlugin.js    # Plugin de Tailwind
├── providers/
│   ├── index.ts                    # ✅ Barrel exports
│   ├── ResponsiveProvider.tsx      # Provider base
│   └── ResponsiveLayoutProvider.tsx # Provider con layouts
├── hooks/
│   ├── index.ts                    # ✅ Barrel exports
│   ├── useResponsive.ts            # Hook responsivo
│   ├── useResponsiveLayout.ts      # Hook unificado
│   └── useLayout.ts                # Hook de layout
├── layouts/
│   ├── index.ts                    # ✅ Barrel exports
│   ├── MainLayout.tsx              # Layout principal
│   ├── DefaultLayout.tsx           # Layout por defecto
│   ├── SidebarLayout.tsx           # Layout con sidebar
│   ├── DashboardLayout.tsx         # Layout dashboard
│   └── MinimalLayout.tsx           # Layout mínimo
├── components/layout/
│   ├── index.ts                    # ✅ Barrel exports
│   ├── Navigation.tsx              # Navegación
│   ├── Sidebar.tsx                 # Sidebar
│   ├── Header.tsx                  # Header
│   └── Footer.tsx                  # Footer
├── context/
│   ├── index.ts                    # ✅ Barrel exports
│   ├── ResponsiveLayoutContext.tsx # Context principal
│   └── SidebarContext.tsx          # Context del sidebar
├── config/
│   └── layout.ts                   # Configuración de layouts
└── index.ts                        # ✅ Export principal
```

---

## 🎉 Ejemplo Completo

```tsx
// App.tsx
import { ResponsiveLayoutProvider, MainLayout, useResponsiveLayout } from './index'

function MyApp() {
  return (
    <ResponsiveLayoutProvider defaultLayout="default">
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </ResponsiveLayoutProvider>
  )
}

function Dashboard() {
  const { breakpoint, isMobile } = useResponsiveLayout()
  
  return (
    <div className="p-6 space-y-6"> {/* ✅ Auto-scaling */}
      <h1 className="text-4xl font-bold">Dashboard</h1> {/* ✅ Auto-scaling */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-lg"> {/* ✅ Auto-scaling */}
          <h2 className="text-xl mb-4">Card 1</h2>
          <p className="text-base leading-relaxed">Contenido...</p>
        </div>
        {/* Más cards... */}
      </div>
    </div>
  )
}
```

---

## 🚀 Resultado

**¡Eso es todo!** Tu aplicación ahora:

- ✅ **Escala automáticamente** en todas las pantallas
- ✅ **Usa layouts profesionales** predefinidos
- ✅ **Mantiene código limpio** con Tailwind normal
- ✅ **Funciona en móvil y desktop** sin media queries manuales
- ✅ **Se adapta a pantallas grandes** (1920px, 4K, etc.)

**Desarrollado por [Felipe Caroca](https://github.com/FelipeCaroca1)**