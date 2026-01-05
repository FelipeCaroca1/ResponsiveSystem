#!/usr/bin/env node

/**
 * Script de prueba para validar el postinstall.js
 * Simula un proyecto vacío y verifica que todo se genere correctamente
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Crear directorio temporal para pruebas
const testDir = path.join(__dirname, '..', '.test-project')
const projectRoot = testDir

console.log('🧪 Iniciando pruebas del script postinstall...')
console.log(`   Directorio de prueba: ${testDir}`)
console.log('')

// Limpiar directorio de prueba si existe
if (fs.existsSync(testDir)) {
  console.log('🧹 Limpiando directorio de prueba anterior...')
  try {
    fs.rmSync(testDir, { recursive: true, force: true, maxRetries: 3, retryDelay: 1000 })
  } catch (error) {
    console.log('   ⚠️  No se pudo limpiar completamente, continuando...')
    // Intentar eliminar solo los archivos importantes
    try {
      const importantFiles = ['package.json', 'src', 'vite.config.ts', 'tailwind.config.js', 'postcss.config.js', 'tsconfig.json', 'tsconfig.node.json', 'index.html']
      importantFiles.forEach(file => {
        const filePath = path.join(testDir, file)
        if (fs.existsSync(filePath)) {
          try {
            fs.rmSync(filePath, { recursive: true, force: true })
          } catch (e) {
            // Ignorar errores individuales
          }
        }
      })
    } catch (e) {
      // Continuar de todas formas
    }
  }
}

// Crear directorio de prueba
fs.mkdirSync(testDir, { recursive: true })

// Crear package.json vacío (simulando proyecto nuevo)
const testPackageJson = {
  name: 'test-project',
  version: '1.0.0',
  type: 'module',
  dependencies: {
    'responsive-system': '^1.6.0'
  }
}

fs.writeFileSync(
  path.join(testDir, 'package.json'),
  JSON.stringify(testPackageJson, null, 2)
)

console.log('✅ package.json de prueba creado')
console.log('')

// Cambiar al directorio de prueba
process.chdir(testDir)

// Simular ejecución del postinstall
console.log('📦 Ejecutando postinstall...')
console.log('')

// Importar y ejecutar el postinstall
const postinstallPath = path.join(__dirname, 'postinstall.js')

// Ejecutar el script con node
try {
  // Simular variables de entorno de postinstall
  process.env.npm_lifecycle_event = 'postinstall'
  
  // Ejecutar el script
  execSync(`node "${postinstallPath}"`, {
    stdio: 'inherit',
    cwd: testDir,
    env: {
      ...process.env,
      npm_lifecycle_event: 'postinstall'
    }
  })
  
  console.log('')
  console.log('✅ Postinstall ejecutado')
  console.log('')
} catch (error) {
  console.error('❌ Error al ejecutar postinstall:', error.message)
  process.exit(1)
}

// Verificaciones
console.log('🔍 Verificando archivos generados...')
console.log('')

const checks = []

// 1. Verificar que main.tsx existe y tiene el layout correcto
const mainTsxPath = path.join(testDir, 'src', 'main.tsx')
if (fs.existsSync(mainTsxPath)) {
  const mainTsxContent = fs.readFileSync(mainTsxPath, 'utf8')
  
  // Verificar que tiene ResponsiveLayoutProvider con defaultLayout
  if (mainTsxContent.includes('ResponsiveLayoutProvider')) {
    if (mainTsxContent.includes('defaultLayout="default"')) {
      checks.push({ name: 'main.tsx tiene defaultLayout="default"', ok: true })
    } else {
      checks.push({ name: 'main.tsx tiene defaultLayout="default"', ok: false, error: 'No se encontró defaultLayout="default"' })
    }
  } else {
    checks.push({ name: 'main.tsx tiene ResponsiveLayoutProvider', ok: false, error: 'No se encontró ResponsiveLayoutProvider' })
  }
} else {
  checks.push({ name: 'main.tsx existe', ok: false, error: 'Archivo no encontrado' })
}

// 2. Verificar que App.tsx existe
const appTsxPath = path.join(testDir, 'src', 'App.tsx')
if (fs.existsSync(appTsxPath)) {
  checks.push({ name: 'App.tsx existe', ok: true })
} else {
  checks.push({ name: 'App.tsx existe', ok: false, error: 'Archivo no encontrado' })
}

// 3. Verificar que HomePage.tsx existe
const homePagePath = path.join(testDir, 'src', 'pages', 'HomePage.tsx')
if (fs.existsSync(homePagePath)) {
  checks.push({ name: 'HomePage.tsx existe', ok: true })
} else {
  checks.push({ name: 'HomePage.tsx existe', ok: false, error: 'Archivo no encontrado' })
}

// 4. Verificar que los componentes del layout "default" se generaron
const navigationPath = path.join(testDir, 'src', 'components', 'layout', 'Navigation.tsx')
const footerPath = path.join(testDir, 'src', 'components', 'layout', 'Footer.tsx')
const sidebarPath = path.join(testDir, 'src', 'components', 'layout', 'Sidebar.tsx')

if (fs.existsSync(navigationPath)) {
  checks.push({ name: 'Navigation.tsx generado (layout default)', ok: true })
} else {
  checks.push({ name: 'Navigation.tsx generado (layout default)', ok: false, error: 'Archivo no encontrado' })
}

if (fs.existsSync(footerPath)) {
  checks.push({ name: 'Footer.tsx generado (layout default)', ok: true })
} else {
  checks.push({ name: 'Footer.tsx generado (layout default)', ok: false, error: 'Archivo no encontrado' })
}

// Verificar que Sidebar NO se generó para layout "default"
if (!fs.existsSync(sidebarPath)) {
  checks.push({ name: 'Sidebar.tsx NO generado (correcto para default)', ok: true })
} else {
  checks.push({ name: 'Sidebar.tsx NO generado (correcto para default)', ok: false, error: 'Sidebar.tsx no debería existir para layout default' })
}

// 5. Verificar que useResponsive se copió
const useResponsivePath = path.join(testDir, 'src', 'hooks', 'useResponsive.ts')
if (fs.existsSync(useResponsivePath)) {
  checks.push({ name: 'useResponsive.ts copiado', ok: true })
} else {
  checks.push({ name: 'useResponsive.ts copiado', ok: false, error: 'Archivo no encontrado' })
}

// 6. Verificar que los archivos de configuración existen
const configFiles = [
  { path: 'vite.config.ts', name: 'vite.config.ts' },
  { path: 'tailwind.config.js', name: 'tailwind.config.js' },
  { path: 'postcss.config.js', name: 'postcss.config.js' },
  { path: 'tsconfig.json', name: 'tsconfig.json' },
  { path: 'tsconfig.node.json', name: 'tsconfig.node.json' },
  { path: 'index.html', name: 'index.html' },
  { path: 'src/index.css', name: 'src/index.css' }
]

configFiles.forEach(({ path: filePath, name }) => {
  const fullPath = path.join(testDir, filePath)
  if (fs.existsSync(fullPath)) {
    checks.push({ name: `${name} existe`, ok: true })
  } else {
    checks.push({ name: `${name} existe`, ok: false, error: 'Archivo no encontrado' })
  }
})

// 7. Verificar que package.json tiene las dependencias correctas
const finalPackageJson = JSON.parse(fs.readFileSync(path.join(testDir, 'package.json'), 'utf8'))
const requiredDeps = ['react', 'react-dom']
const requiredDevDeps = ['vite', '@vitejs/plugin-react', 'tailwindcss', '@tailwindcss/postcss', 'postcss', 'autoprefixer', 'typescript', '@types/react', '@types/react-dom']

requiredDeps.forEach(dep => {
  if (finalPackageJson.dependencies && finalPackageJson.dependencies[dep]) {
    checks.push({ name: `Dependency ${dep} agregada`, ok: true })
  } else {
    checks.push({ name: `Dependency ${dep} agregada`, ok: false, error: 'No encontrada en dependencies' })
  }
})

requiredDevDeps.forEach(dep => {
  if (finalPackageJson.devDependencies && finalPackageJson.devDependencies[dep]) {
    checks.push({ name: `DevDependency ${dep} agregada`, ok: true })
  } else {
    checks.push({ name: `DevDependency ${dep} agregada`, ok: false, error: 'No encontrada en devDependencies' })
  }
})

// Mostrar resultados
console.log('📊 Resultados de las verificaciones:')
console.log('')

let allPassed = true
checks.forEach(check => {
  if (check.ok) {
    console.log(`   ✅ ${check.name}`)
  } else {
    console.log(`   ❌ ${check.name}`)
    if (check.error) {
      console.log(`      Error: ${check.error}`)
    }
    allPassed = false
  }
})

console.log('')

if (allPassed) {
  console.log('🎉 ¡Todas las verificaciones pasaron!')
  console.log('')
  console.log('💡 El script postinstall está funcionando correctamente.')
  console.log('   Puedes publicar el paquete con confianza.')
} else {
  console.log('⚠️  Algunas verificaciones fallaron.')
  console.log('   Revisa los errores antes de publicar.')
  process.exit(1)
}

console.log('')
console.log(`📁 Directorio de prueba: ${testDir}`)
console.log('   Puedes revisar los archivos generados allí.')
console.log('')

