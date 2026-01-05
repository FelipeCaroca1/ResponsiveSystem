#!/usr/bin/env node

/**
 * Script para generar index.d.ts desde los tipos generados por tsc
 */

import { readFileSync, writeFileSync, existsSync, copyFileSync, readdirSync, mkdirSync } from 'fs'
import { resolve, dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = resolve(__dirname, '..')
const distPath = resolve(projectRoot, 'dist')
const indexDtsPath = resolve(distPath, 'index.d.ts')

// Leer src/index.ts para obtener los exports
const srcIndexPath = resolve(projectRoot, 'src', 'index.ts')
const srcIndexContent = readFileSync(srcIndexPath, 'utf-8')

// Extraer todos los exports (manejar exports multilínea)
const exportLines = []
const lines = srcIndexContent.split('\n')
let inMultiLineExport = false
let currentExport = ''

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  const trimmed = line.trim()
  
  // Saltar comentarios y líneas vacías
  if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed === '') {
    continue
  }
  
  if (trimmed.startsWith('export ')) {
    if (inMultiLineExport) {
      // Cerrar el export anterior
      exportLines.push(currentExport)
      currentExport = ''
    }
    
    if (trimmed.includes('}') || !trimmed.includes('{')) {
      // Export de una sola línea
      exportLines.push(trimmed)
      inMultiLineExport = false
    } else {
      // Export multilínea que empieza
      currentExport = trimmed
      inMultiLineExport = true
    }
  } else if (inMultiLineExport) {
    // Continuar el export multilínea
    currentExport += ' ' + trimmed
    if (trimmed.includes('}')) {
      // Cerrar el export
      exportLines.push(currentExport)
      currentExport = ''
      inMultiLineExport = false
    }
  }
}

// Generar index.d.ts con los exports
const dtsContent = `// Auto-generated from src/index.ts
${exportLines.join('\n')}
`

writeFileSync(indexDtsPath, dtsContent, 'utf-8')

// Generar index.d.ts para subdirectorios (barrel exports)
const barrelExports = [
  { key: 'providers', path: resolve(projectRoot, 'src', 'providers', 'index.ts') },
  { key: 'layouts', path: resolve(projectRoot, 'src', 'layouts', 'index.ts') },
  { key: 'hooks', path: resolve(projectRoot, 'src', 'hooks', 'index.ts') },
  { key: 'components/layout', path: resolve(projectRoot, 'src', 'components', 'layout', 'index.ts') },
  { key: 'context', path: resolve(projectRoot, 'src', 'context', 'index.ts') },
]

for (const { key, path: srcPath } of barrelExports) {
  if (existsSync(srcPath)) {
    const content = readFileSync(srcPath, 'utf-8')
    const exportLines = []
    const lines = content.split('\n')
    
    for (const line of lines) {
      const trimmed = line.trim()
      if (trimmed.startsWith('export ')) {
        exportLines.push(trimmed)
      }
    }
    
    if (exportLines.length > 0) {
      const destPath = resolve(distPath, key, 'index.d.ts')
      const dir = resolve(distPath, key)
      
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true })
      }
      
      const dtsContent = `// Auto-generated from src/${key}/index.ts\n${exportLines.join('\n')}\n`
      writeFileSync(destPath, dtsContent, 'utf-8')
    }
  }
}

// Restaurar tipos individuales desde .temp-types si existen
const tempTypesPath = resolve(projectRoot, '.temp-types')
if (existsSync(tempTypesPath)) {
  function restoreTypesRecursive(src, dest) {
    if (!existsSync(src)) return
    
    const entries = readdirSync(src, { withFileTypes: true })
    
    for (const entry of entries) {
      const srcPath = join(src, entry.name)
      const destPath = join(dest, entry.name)
      
      if (entry.isDirectory()) {
        if (!existsSync(destPath)) {
          mkdirSync(destPath, { recursive: true })
        }
        restoreTypesRecursive(srcPath, destPath)
      } else if (entry.name.endsWith('.d.ts') && entry.name !== 'index.d.ts') {
        // No sobrescribir index.d.ts que acabamos de generar
        copyFileSync(srcPath, destPath)
      }
    }
  }
  
  restoreTypesRecursive(tempTypesPath, distPath)
  console.log('✅ Restored individual type files')
}

// Verificar que los archivos .d.ts individuales existan
// Si no existen, tsc no los generó correctamente
const requiredDtsFiles = [
  'providers/index.d.ts',
  'layouts/index.d.ts',
  'hooks/index.d.ts',
  'components/layout/index.d.ts',
  'context/index.d.ts',
  'types/responsive.d.ts',
  'constants/breakpoints.d.ts',
  'config/layout.d.ts',
]

let missingFiles = []
for (const file of requiredDtsFiles) {
  const filePath = resolve(distPath, file)
  if (!existsSync(filePath)) {
    missingFiles.push(file)
  }
}

if (missingFiles.length > 0) {
  console.warn('⚠️  Warning: Some .d.ts files are missing:')
  missingFiles.forEach(file => console.warn(`   - ${file}`))
  console.warn('   Types may not work correctly. Run: npm run build:types')
} else {
  console.log('✅ Generated index.d.ts with all type references')
}

