# 🏗️ Arquitectura del Sistema

## 📦 Sistema Core vs Ejemplos

### ✅ **SISTEMA CORE (Independiente)**

Estos archivos conforman el **sistema responsivo reutilizable**. Puedes eliminar las páginas de ejemplo y el sistema seguirá funcionando.

#### **Plugin**
```
src/plugin/
└── responsiveScalePlugin.js    # ✅ Plugin de Tailwind
```

#### **Providers**
```
src/providers/
├── index.ts                    # ✅ Barrel exports
├── ResponsiveProvider.tsx      # ✅ Provider base
└── ResponsiveLayoutProvider.tsx # ✅ Provider con layouts
```

#### **Hooks**
```
src/hooks/
├── index.ts                    # ✅ Barrel exports
├── useResponsive.ts            # ✅ Hook responsivo
├── useResponsiveLayout.ts      # ✅ Hook unificado
└── useLayout.ts                # ✅ Hook de layout
```

#### **Layouts**
```
src/layouts/
├── index.ts                    # ✅ Barrel exports
├── MainLayout.tsx              # ✅ Layout principal
├── DefaultLayout.tsx           # ✅ Layout por defecto
├── SidebarLayout.tsx           # ✅ Layout con sidebar
├── DashboardLayout.tsx         # ✅ Layout dashboard
└── MinimalLayout.tsx           # ✅ Layout mínimo
```

#### **Componentes de Layout**
```
src/components/layout/
├── index.ts                    # ✅ Barrel exports
├── Navigation.tsx              # ✅ Navegación
├── Sidebar.tsx                 # ✅ Sidebar
├── Header.tsx                  # ✅ Header
└── Footer.tsx                  # ✅ Footer
```

#### **Context**
```
src/context/
├── index.ts                    # ✅ Barrel exports
├── ResponsiveLayoutContext.tsx # ✅ Context principal
├── SidebarContext.tsx          # ✅ Context del sidebar
└── NavigationContext.tsx       # ✅ Context de navegación
```

#### **Tipos**
```
src/types/
└── responsive.ts               # ✅ Tipos TypeScript
```

#### **Constantes**
```
src/constants/
└── breakpoints.ts              # ✅ Configuración de breakpoints
```

#### **Configuración**
```
src/config/
└── layout.ts                   # ✅ Configuración de layouts
```

#### **Componentes Auxiliares**
```
src/components/
└── LayoutSwitcher.tsx          # ✅ Selector de layouts
```

#### **Export Principal**
```
src/index.ts                    # ✅ Exportaciones del sistema
```

---

### 🎨 **EJEMPLOS (Eliminables)**

Estos archivos son **solo para demostración**. Puedes eliminarlos sin afectar el sistema core.

#### **Páginas de Ejemplo**
```
src/pages/
└── ResponsiveTestPage.tsx      # ❌ Ejemplo - Suite de tests
```

#### **Componentes de Ejemplo**
```
src/components/
└── ResponsiveDemo.tsx          # ❌ Ejemplo - Demo visual
```

#### **App de Ejemplo**
```
src/App.tsx                     # ❌ Ejemplo - Aplicación de prueba
src/main.tsx                    # ❌ Ejemplo - Entry point
```

---

### **Paso 1: Actualizar `src/index.ts`**
```typescript
// Eliminar estas líneas:
export { default as ResponsiveTestPage } from './pages/ResponsiveTestPage'
export { default as ResponsiveDemo } from './components/ResponsiveDemo'
```

### **Paso 2: Listo ✅**
El sistema core sigue funcionando perfectamente. Ahora puedes:
- Instalar el sistema en tu proyecto
- Importar solo lo que necesites: `import { ResponsiveLayoutProvider, MainLayout } from './index'`
- Usar el plugin en `tailwind.config.js`

---

## 📖 Uso en Tu Proyecto

### **1. Instalar el Sistema**
```bash
# Copiar la carpeta src/ a tu proyecto
# O publicar como paquete npm
```

### **2. Configurar Tailwind**
```js
// tailwind.config.js
import responsiveScalePlugin from './src/plugin/responsiveScalePlugin.js'

export default {
  plugins: [responsiveScalePlugin({ /* config */ })]
}
```

### **3. Crear Tu App**
```tsx
// TuApp.tsx
import { ResponsiveLayoutProvider, MainLayout } from './index'

function TuApp() {
  return (
    <ResponsiveLayoutProvider defaultLayout="default">
      <MainLayout>
        <TuContenido />
      </MainLayout>
    </ResponsiveLayoutProvider>
  )
}
```

### **4. Si Necesitas Navegación**
```tsx
import { NavigationProvider, useNavigation } from './index'

function TuApp() {
  return (
    <NavigationProvider defaultPage="home">
      <ResponsiveLayoutProvider defaultLayout="default">
        <MainLayout>
          <TuContenido />
        </MainLayout>
      </ResponsiveLayoutProvider>
    </NavigationProvider>
  )
}
```

---

## 🎯 Resumen

| Tipo | Archivos | ¿Eliminable? | Función |
|------|----------|--------------|---------|
| **Sistema Core** | 30+ archivos | ❌ NO | Sistema responsivo + layouts |
| **Ejemplos** | 4 archivos | ✅ SÍ | Demostración y pruebas |

**✅ El sistema es 100% independiente de los ejemplos**
**✅ Puedes eliminar `App.tsx`, `ResponsiveDemo.tsx`, `ResponsiveTestPage.tsx` sin problemas**


