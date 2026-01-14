#!/usr/bin/env node

/**
 * Script postinstall para automatizar la configuración inicial completa
 * - Instala React, TypeScript, Tailwind automáticamente
 * - Inicializa proyecto Vite si está vacío
 * - Pregunta qué layout quiere (interactivo)
 * - Copia solo los componentes necesarios
 * - Copia el hook useResponsive como archivo local
 * - Crea página de ejemplo en pages/
 * - Configura App.tsx con el layout seleccionado
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import readline from 'readline'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = process.cwd()
const packageJsonPath = path.join(projectRoot, 'package.json')

// Detectar si se ejecuta como postinstall o manualmente
const isPostinstall = process.env.npm_lifecycle_event === 'postinstall'
const isManual = process.argv[1].includes('postinstall.js') && !isPostinstall

// Detectar CI/CD environments
const isCI = !!(
  process.env.CI ||
  process.env.VERCEL ||
  process.env.NETLIFY ||
  process.env.GITHUB_ACTIONS ||
  process.env.GITLAB_CI ||
  process.env.CIRCLECI ||
  process.env.TRAVIS ||
  process.env.JENKINS_URL
)

// Si está en CI/CD, salir silenciosamente
if (isCI && isPostinstall) {
  process.exit(0)
}

console.log('')
console.log('📦 responsive-system: Iniciando configuración...')
console.log(`   Directorio: ${projectRoot}`)
console.log('')

// Verificar si package.json existe
if (!fs.existsSync(packageJsonPath)) {
  console.log('⚠️  No se encontró package.json, saltando configuración')
  process.exit(0)
}

let packageJson
try {
  packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
} catch (error) {
  console.error('❌ Error al leer package.json:', error.message)
  process.exit(1)
}

// Verificar si el proyecto está vacío (solo tiene responsive-system)
const isProjectEmpty = !packageJson.dependencies || 
                       Object.keys(packageJson.dependencies).length === 0 ||
                       (Object.keys(packageJson.dependencies).length === 1 && packageJson.dependencies['responsive-system'])

// Verificar qué está instalado - SOLO en package.json (no en node_modules para evitar conflictos)
const hasReactInPackageJson = (packageJson.dependencies && packageJson.dependencies.react) || 
                              (packageJson.devDependencies && packageJson.devDependencies.react)
const hasVite = packageJson.devDependencies && packageJson.devDependencies.vite
const tailwindInDevDeps = packageJson.devDependencies && packageJson.devDependencies.tailwindcss
const typescriptInDevDeps = packageJson.devDependencies && packageJson.devDependencies.typescript

let needsUpdate = false

// Función para preguntar al usuario qué layout quiere
async function askLayout() {
  if (isPostinstall && !isManual) {
    console.log('   ℹ️  Usando layout "default" por defecto')
    console.log('   💡 Ejecuta "npx responsive-system-setup" para cambiar el layout')
    return 'default'
  }

  // Si es ejecución manual, preguntar interactivamente
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve) => {
    console.log('')
    console.log('🎨 Selecciona el layout que quieres usar:')
    console.log('   1. default    - Navigation + Footer')
    console.log('   2. sidebar    - Sidebar lateral')
    console.log('   3. dashboard  - Sidebar + Footer')
    console.log('   4. minimal    - Sin componentes (solo contenido)')
    console.log('')
    
    rl.question('   Ingresa el número (1-4) o el nombre del layout: ', (answer) => {
      rl.close()
      
      const normalized = answer.trim().toLowerCase()
      
      if (normalized === '1' || normalized === 'default') {
        resolve('default')
      } else if (normalized === '2' || normalized === 'sidebar') {
        resolve('sidebar')
      } else if (normalized === '3' || normalized === 'dashboard') {
        resolve('dashboard')
      } else if (normalized === '4' || normalized === 'minimal') {
        resolve('minimal')
      } else {
        console.log('   ⚠️  Opción inválida, usando "default"')
        resolve('default')
      }
    })
  })
}

// Función para copiar archivo desde el paquete al proyecto
function copyFileFromPackage(relativePath, targetPath, isComponent = false) {
  const sourcePath = path.join(__dirname, '..', relativePath)
  const destPath = path.join(projectRoot, targetPath)
  
  if (!fs.existsSync(sourcePath)) {
    console.error(`   ❌ No se encontró: ${relativePath}`)
    return false
  }
  
  // Crear directorio destino si no existe
  const destDir = path.dirname(destPath)
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true })
  }
  
  let content = fs.readFileSync(sourcePath, 'utf8')
  
  // Si es un componente, reemplazar importaciones relativas por importaciones del paquete
  if (isComponent) {
    // Reemplazar importaciones de hooks
    content = content.replace(
      /from ['"]\.\.\/\.\.\/hooks['"]/g,
      "from 'responsive-system'"
    )
    // Reemplazar importaciones de context
    content = content.replace(
      /from ['"]\.\.\/\.\.\/context['"]/g,
      "from 'responsive-system'"
    )
    // Reemplazar importaciones de componentes/layout
    content = content.replace(
      /from ['"]\.\.\/components\/layout['"]/g,
      "from 'responsive-system'"
    )
  }
  
  fs.writeFileSync(destPath, content)
  return true
}

// Función para generar componentes genéricos según el layout seleccionado
function generateLayoutComponents(selectedLayout) {
  const componentsDir = path.join(projectRoot, 'src', 'components', 'layout')
  
  // Crear directorio si no existe
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true })
  }
  
  const componentsToGenerate = {
    default: ['Navigation', 'Footer'],
    sidebar: ['Sidebar'],
    dashboard: ['Sidebar', 'Footer'],
    minimal: []
  }
  
  const components = componentsToGenerate[selectedLayout] || []
  
  if (components.length === 0) {
    console.log('   ✅ Layout minimal: No se generan componentes')
    return
  }
  
  console.log(`   📦 Generando componentes para layout "${selectedLayout}":`)
  
  // Generar Navigation genérico
  if (components.includes('Navigation')) {
    const navigationContent = `import { useResponsiveLayout } from 'responsive-system'

const Navigation = () => {
  const { isMobile } = useResponsiveLayout()
  
  return (
    <nav className="sticky top-0 z-50 border-b bg-white">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border rounded flex items-center justify-center flex-shrink-0">
              <span className="text-sm">Logo</span>
            </div>
            <h1 className="font-semibold text-lg truncate">App Name</h1>
          </div>
          
          {isMobile && (
            <button
              type="button"
              aria-label="Toggle menu"
              className="p-2 rounded transition-opacity hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
`
    fs.writeFileSync(path.join(componentsDir, 'Navigation.tsx'), navigationContent)
    console.log('      ✅ Navigation.tsx')
  }
  
  // Generar Footer genérico
  if (components.includes('Footer')) {
    const footerContent = `const Footer = () => {
  return (
    <footer className="border-t flex-shrink-0" role="contentinfo">
      <div className="px-4 py-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Your App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
`
    fs.writeFileSync(path.join(componentsDir, 'Footer.tsx'), footerContent)
    console.log('      ✅ Footer.tsx')
  }
  
  // Generar Sidebar genérico
  if (components.includes('Sidebar')) {
    const sidebarContent = `import { useResponsiveLayout } from 'responsive-system'
import { useSidebar } from 'responsive-system'

interface SidebarProps {
  showLogo?: boolean
}

const Sidebar = ({ showLogo = true }: SidebarProps) => {
  const { isMobile, isTablet } = useResponsiveLayout()
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  
  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ]
  
  return (
    <>
      {isMobile && (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
          className="fixed top-4 left-4 z-50 p-2 rounded border transition-opacity hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      <aside 
        className={\`border-r h-full \${isMobile ? 'hidden' : 'w-64 flex-shrink-0'} \${isTablet ? 'w-56' : 'w-64'}\`}
        aria-label="Sidebar navigation"
      >
        <div className="p-6 flex flex-col h-full overflow-y-auto">
          {showLogo && (
            <div className="flex items-center space-x-3 mb-8 flex-shrink-0">
              <div className="w-8 h-8 border rounded flex items-center justify-center flex-shrink-0">
                <span className="text-sm">Logo</span>
              </div>
              <span className="font-bold text-lg truncate">App Name</span>
            </div>
          )}
          
          <nav className={\`space-y-2 flex-1 \${showLogo ? '' : 'pt-0'}\`} role="navigation" aria-label="Main navigation">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className="w-full flex items-center px-4 py-3 rounded transition-all text-left hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2"
                aria-label={item.label}
              >
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {isMobile && sidebarOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          <aside 
            className="fixed top-0 left-0 w-64 h-full border-r z-50 overflow-y-auto"
            aria-label="Mobile sidebar navigation"
            role="dialog"
            aria-modal="true"
          >
            <div className="p-6 flex flex-col h-full pt-20">
              {showLogo && (
                <div className="flex items-center space-x-3 mb-8 flex-shrink-0">
                  <div className="w-8 h-8 border rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">Logo</span>
                  </div>
                  <span className="font-bold text-lg truncate">App Name</span>
                </div>
              )}
              
              <nav className={\`space-y-2 flex-1 \${showLogo ? '' : 'pt-0'}\`} role="navigation" aria-label="Main navigation">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="w-full flex items-center px-4 py-3 rounded transition-all text-left hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    aria-label={item.label}
                  >
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>
        </>
      )}
    </>
  )
}

export default Sidebar
`
    fs.writeFileSync(path.join(componentsDir, 'Sidebar.tsx'), sidebarContent)
    console.log('      ✅ Sidebar.tsx')
  }
  
  // Crear index.ts para exportar los componentes
  const indexContent = components.map(c => `export { default as ${c} } from './${c}'`).join('\n')
  fs.writeFileSync(path.join(componentsDir, 'index.ts'), indexContent)
  console.log('      ✅ index.ts')
}

// Función para copiar el hook useResponsive y sus dependencias
function copyUseResponsiveHook() {
  console.log('   📦 Copiando hook useResponsive...')
  
  // Crear directorio hooks
  const hooksDir = path.join(projectRoot, 'src', 'hooks')
  if (!fs.existsSync(hooksDir)) {
    fs.mkdirSync(hooksDir, { recursive: true })
  }
  
  // Copiar tipos
  const typesDir = path.join(projectRoot, 'src', 'types')
  if (!fs.existsSync(typesDir)) {
    fs.mkdirSync(typesDir, { recursive: true })
  }
  copyFileFromPackage('src/types/responsive.ts', 'src/types/responsive.ts')
  console.log('      ✅ types/responsive.ts')
  
  // Copiar constantes
  const constantsDir = path.join(projectRoot, 'src', 'constants')
  if (!fs.existsSync(constantsDir)) {
    fs.mkdirSync(constantsDir, { recursive: true })
  }
  copyFileFromPackage('src/constants/breakpoints.ts', 'src/constants/breakpoints.ts')
  console.log('      ✅ constants/breakpoints.ts')
  
  // Copiar hook useResponsive
  copyFileFromPackage('src/hooks/useResponsive.ts', 'src/hooks/useResponsive.ts')
  console.log('      ✅ hooks/useResponsive.ts')
  
  // Crear index.ts para exportar el hook
  const indexContent = `export { useResponsive } from './useResponsive'
export type { ResponsiveState, Breakpoint, Orientation } from '../types/responsive'
export { DEFAULT_BREAKPOINTS, getCurrentBreakpoint, getBreakpointIndex, getBreakpointValue } from '../constants/breakpoints'
`
  fs.writeFileSync(path.join(hooksDir, 'index.ts'), indexContent)
  console.log('      ✅ hooks/index.ts')
}

console.log('📦 Verificando dependencias...')

// Agregar React a dependencies SOLO si NO está en package.json
if (!hasReactInPackageJson) {
  console.log('   ➕ Agregando React a dependencies...')
  if (!packageJson.dependencies) {
    packageJson.dependencies = {}
  }
  packageJson.dependencies['react'] = '^19.1.1'
  packageJson.dependencies['react-dom'] = '^19.1.1'
  needsUpdate = true
} else {
  console.log('   ✅ React ya está instalado')
}

// Agregar Vite si el proyecto está vacío
if (isProjectEmpty && !hasVite) {
  console.log('   ➕ Agregando Vite a devDependencies...')
  if (!packageJson.devDependencies) {
    packageJson.devDependencies = {}
  }
  packageJson.devDependencies['vite'] = '^7.1.7'
  packageJson.devDependencies['@vitejs/plugin-react'] = '^5.0.4'
  needsUpdate = true
}

// Agregar Tailwind y sus dependencias a devDependencies
if (!tailwindInDevDeps) {
  console.log('   ➕ Agregando Tailwind y PostCSS a devDependencies...')
  if (!packageJson.devDependencies) {
    packageJson.devDependencies = {}
  }
  packageJson.devDependencies['tailwindcss'] = '^4.1.14'
  packageJson.devDependencies['@tailwindcss/postcss'] = '^4.1.14'
  packageJson.devDependencies['postcss'] = '^8.5.6'
  packageJson.devDependencies['autoprefixer'] = '^10.4.21'
  needsUpdate = true
}

// Agregar TypeScript y sus tipos a devDependencies
if (!typescriptInDevDeps) {
  console.log('   ➕ Agregando TypeScript a devDependencies...')
  if (!packageJson.devDependencies) {
    packageJson.devDependencies = {}
  }
  packageJson.devDependencies['typescript'] = '~5.9.3'
  packageJson.devDependencies['@types/react'] = '^19.1.16'
  packageJson.devDependencies['@types/react-dom'] = '^19.1.9'
  needsUpdate = true
}

// Agregar "type": "module" si no existe (para evitar warnings)
if (!packageJson.type) {
  packageJson.type = 'module'
  needsUpdate = true
}

// Escribir package.json modificado
if (needsUpdate) {
  console.log('')
  console.log('📝 Actualizando package.json...')
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  console.log('✅ package.json actualizado')
  console.log('')
  console.log('⚠️  Ejecuta "npm install" para instalar las dependencias')
} else {
  console.log('✅ Todas las dependencias ya están en package.json')
}

// Verificar si el proyecto ya está configurado
const mainTsxPath = path.join(projectRoot, 'src', 'main.tsx')
const layoutsDir = path.join(projectRoot, 'src', 'layouts')
const isAlreadyConfigured = fs.existsSync(mainTsxPath) && fs.existsSync(layoutsDir) && fs.existsSync(path.join(projectRoot, 'vite.config.ts'))

// Si el proyecto está vacío, crear estructura base
if (isProjectEmpty) {
  // Si ya está configurado, preguntar si quiere sobrescribir
  if (isAlreadyConfigured) {
    console.log('')
    console.log('⚠️  El proyecto ya está configurado')
    
    if (isManual) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })
      
      const answer = await new Promise((resolve) => {
        rl.question('   ¿Deseas sobrescribir la configuración existente? (s/n): ', (answer) => {
          rl.close()
          resolve(answer.trim().toLowerCase())
        })
      })
      
      if (answer !== 's' && answer !== 'si' && answer !== 'y' && answer !== 'yes') {
        console.log('   ✅ Configuración existente preservada')
        process.exit(0)
      }
      
      console.log('   ⚠️  Sobrescribiendo configuración...')
      console.log('')
    } else {
      // Si es postinstall automático y ya está configurado, salir
      console.log('   ✅ Proyecto ya configurado, saltando setup')
      process.exit(0)
    }
  }
  
  console.log('')
  console.log('📦 Proyecto vacío detectado, creando estructura base...')
  console.log('')
  
  // Preguntar qué layout quiere
  const selectedLayout = await askLayout()
  console.log(`   ✅ Layout seleccionado: "${selectedLayout}"`)
  console.log('')
  
  // Crear estructura de directorios
  const dirs = ['src', 'src/components', 'src/components/layout', 'src/pages', 'src/hooks', 'src/types', 'src/constants', 'public']
  dirs.forEach(dir => {
    const dirPath = path.join(projectRoot, dir)
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
  })
  
  // Generar componentes genéricos según layout seleccionado
  generateLayoutComponents(selectedLayout)
  console.log('')
  
  // Copiar hook useResponsive
  copyUseResponsiveHook()
  console.log('')
  
  // Crear vite.config.ts
  const viteConfigPath = path.join(projectRoot, 'vite.config.ts')
  if (!fs.existsSync(viteConfigPath)) {
    const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
`
    fs.writeFileSync(viteConfigPath, viteConfig)
    console.log('   ✅ Creado: vite.config.ts')
  }
  
  // Crear tailwind.config.js
  const tailwindConfigPath = path.join(projectRoot, 'tailwind.config.js')
  if (!fs.existsSync(tailwindConfigPath)) {
    const tailwindConfig = `import responsiveScalePlugin from 'responsive-system/plugin'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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
        typography: true,
        spacing: true,
        lineHeight: true,
        letterSpacing: true,
        shadows: true,
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
`
    fs.writeFileSync(tailwindConfigPath, tailwindConfig)
    console.log('   ✅ Creado: tailwind.config.js')
  }
  
  // Crear postcss.config.js
  const postcssConfigPath = path.join(projectRoot, 'postcss.config.js')
  if (!fs.existsSync(postcssConfigPath)) {
    const postcssConfig = `export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
`
    fs.writeFileSync(postcssConfigPath, postcssConfig)
    console.log('   ✅ Creado: postcss.config.js')
  }
  
  // Crear tsconfig.json
  const tsconfigPath = path.join(projectRoot, 'tsconfig.json')
  if (!fs.existsSync(tsconfigPath)) {
    const tsconfig = `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
`
    fs.writeFileSync(tsconfigPath, tsconfig)
    console.log('   ✅ Creado: tsconfig.json')
  }
  
  // Crear tsconfig.node.json
  const tsconfigNodePath = path.join(projectRoot, 'tsconfig.node.json')
  if (!fs.existsSync(tsconfigNodePath)) {
    const tsconfigNode = `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
`
    fs.writeFileSync(tsconfigNodePath, tsconfigNode)
    console.log('   ✅ Creado: tsconfig.node.json')
  }
  
  // Crear index.html
  const indexHtmlPath = path.join(projectRoot, 'index.html')
  if (!fs.existsSync(indexHtmlPath)) {
    const indexHtml = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Responsive System Demo</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
    fs.writeFileSync(indexHtmlPath, indexHtml)
    console.log('   ✅ Creado: index.html')
  }
  
  // Crear layout local según el seleccionado
  const layoutsDir = path.join(projectRoot, 'src', 'layouts')
  if (!fs.existsSync(layoutsDir)) {
    fs.mkdirSync(layoutsDir, { recursive: true })
  }
  
  // Generar layout local que use los componentes locales
  let layoutContent = ''
  if (selectedLayout === 'default') {
    layoutContent = `import React from 'react'
import { Navigation, Footer } from '../components/layout'

interface DefaultLayoutProps {
  children: React.ReactNode
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default DefaultLayout
`
  } else if (selectedLayout === 'sidebar') {
    layoutContent = `import React from 'react'
import { Sidebar } from '../components/layout'
import { SidebarProvider } from 'responsive-system'

interface SidebarLayoutProps {
  children: React.ReactNode
}

const SidebarLayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <SidebarLayoutContent>{children}</SidebarLayoutContent>
    </SidebarProvider>
  )
}

export default SidebarLayout
`
  } else if (selectedLayout === 'dashboard') {
    layoutContent = `import React from 'react'
import { Navigation, Sidebar, Footer } from '../components/layout'
import { SidebarProvider } from 'responsive-system'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayoutContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col h-screen">
      <Navigation />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar showLogo={false} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </SidebarProvider>
  )
}

export default DashboardLayout
`
  } else { // minimal
    layoutContent = `import React from 'react'

interface MinimalLayoutProps {
  children: React.ReactNode
}

const MinimalLayout: React.FC<MinimalLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <main>
        {children}
      </main>
    </div>
  )
}

export default MinimalLayout
`
  }
  
  const layoutPath = path.join(layoutsDir, `${selectedLayout.charAt(0).toUpperCase() + selectedLayout.slice(1)}Layout.tsx`)
  fs.writeFileSync(layoutPath, layoutContent)
  console.log(`   ✅ Creado: src/layouts/${path.basename(layoutPath)}`)
  
  // Crear src/main.tsx que use el layout local
  const mainTsxPath = path.join(projectRoot, 'src', 'main.tsx')
  if (!fs.existsSync(mainTsxPath)) {
    const layoutName = selectedLayout.charAt(0).toUpperCase() + selectedLayout.slice(1) + 'Layout'
    const mainTsx = `import React from 'react'
import ReactDOM from 'react-dom/client'
import { ResponsiveLayoutProvider } from 'responsive-system'
import ${layoutName} from './layouts/${layoutName}'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ResponsiveLayoutProvider defaultLayout="${selectedLayout}">
      <${layoutName}>
        <App />
      </${layoutName}>
    </ResponsiveLayoutProvider>
  </React.StrictMode>,
)
`
    fs.writeFileSync(mainTsxPath, mainTsx)
    console.log('   ✅ Creado: src/main.tsx')
  }
  
  // Crear src/index.css
  const indexCssPath = path.join(projectRoot, 'src', 'index.css')
  if (!fs.existsSync(indexCssPath)) {
    const indexCss = `@import "tailwindcss";
`
    fs.writeFileSync(indexCssPath, indexCss)
    console.log('   ✅ Creado: src/index.css')
  }
  
  // Crear src/pages/HomePage.tsx con página de ejemplo simple
  const homePagePath = path.join(projectRoot, 'src', 'pages', 'HomePage.tsx')
  if (!fs.existsSync(homePagePath)) {
    const homePage = `import { useResponsiveLayout } from 'responsive-system'
import { useResponsive } from '../hooks'

function HomePage() {
  const { breakpoint, isMobile, width, height, layout } = useResponsiveLayout()
  const responsive = useResponsive()

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <header className="border rounded p-6 text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome to Your App</h1>
          <p className="text-lg opacity-75">
            This is an example page showing the responsive system with auto-scaling.
          </p>
        </header>

        {/* Info Cards */}
        <section aria-label="Responsive information" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <article className="border rounded p-4">
            <h3 className="text-sm font-semibold mb-2">Breakpoint</h3>
            <p className="text-2xl font-bold" aria-live="polite">{breakpoint.toUpperCase()}</p>
          </article>
          <article className="border rounded p-4">
            <h3 className="text-sm font-semibold mb-2">Device</h3>
            <p className="text-2xl font-bold" aria-live="polite">{isMobile ? 'Mobile' : 'Desktop'}</p>
          </article>
          <article className="border rounded p-4">
            <h3 className="text-sm font-semibold mb-2">Width</h3>
            <p className="text-2xl font-bold" aria-live="polite">{width}px</p>
          </article>
          <article className="border rounded p-4">
            <h3 className="text-sm font-semibold mb-2">Height</h3>
            <p className="text-2xl font-bold" aria-live="polite">{height}px</p>
          </article>
        </section>

        {/* Content Cards */}
        <section aria-label="Example content cards" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <article key={i} className="border rounded p-6">
              <div className="w-12 h-12 border rounded flex items-center justify-center mb-4 flex-shrink-0" aria-hidden="true">
                <span className="font-bold">{i}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Card {i}</h3>
              <p className="opacity-75">
                This is an example card. All content scales automatically based on screen size
                thanks to the auto-scaling system.
              </p>
            </article>
          ))}
        </section>

        {/* Info Section */}
        <section className="border rounded p-6">
          <h2 className="text-2xl font-bold mb-4">Responsive System</h2>
          <div className="space-y-3">
            <p>
              <strong>Auto-scaling active:</strong> All content scales automatically based on
              the current breakpoint (text, spacing, shadows).
            </p>
            <p>
              <strong>Hook useResponsive:</strong> Available in{' '}
              <code className="bg-opacity-10 px-2 py-1 rounded text-sm font-mono">src/hooks/useResponsive.ts</code>{' '}
              for manual configuration when needed.
            </p>
            <p>
              <strong>Current layout:</strong> <span className="capitalize">{layout.current}</span>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomePage
`
    fs.writeFileSync(homePagePath, homePage)
    console.log('   ✅ Creado: src/pages/HomePage.tsx (página de ejemplo simple)')
  }
  
  // Crear src/App.tsx que importa la página
  const appTsxPath = path.join(projectRoot, 'src', 'App.tsx')
  if (!fs.existsSync(appTsxPath)) {
    const appTsx = `import HomePage from './pages/HomePage'

function App() {
  return <HomePage />
}

export default App
`
    fs.writeFileSync(appTsxPath, appTsx)
    console.log('   ✅ Creado: src/App.tsx')
  }
  
  // Actualizar package.json con scripts
  if (!packageJson.scripts) {
    packageJson.scripts = {}
  }
  if (!packageJson.scripts.dev) {
    packageJson.scripts.dev = 'vite'
  }
  if (!packageJson.scripts.build) {
    packageJson.scripts.build = 'tsc && vite build'
  }
  if (!packageJson.scripts.preview) {
    packageJson.scripts.preview = 'vite preview'
  }
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  console.log('   ✅ Actualizado: package.json con scripts')
  
  console.log('')
  console.log('🎉 Proyecto inicializado correctamente!')
  console.log('')
  console.log('Para empezar:')
  console.log('  1. npm run dev')
  console.log('  2. Abre http://localhost:5173')
  console.log('')
  console.log(`Layout seleccionado: "${selectedLayout}"`)
  console.log('   - Componentes en src/components/layout/')
  console.log('   - Hook useResponsive en src/hooks/useResponsive.ts')
  console.log('   - Página de ejemplo en src/pages/HomePage.tsx')
  console.log('')
  console.log('💡 Para cambiar el layout: npx responsive-system-setup')
  console.log('')
} else {
  console.log('✅ Proyecto ya inicializado')
}

console.log('')
console.log('✅ Configuración completada')
console.log('')
