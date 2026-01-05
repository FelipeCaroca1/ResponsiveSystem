#!/usr/bin/env node

/**
 * Script postinstall para automatizar la configuración inicial
 * Instala React y Tailwind si no están presentes
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = process.cwd()
const packageJsonPath = path.join(projectRoot, 'package.json')

// Verificar si package.json existe
if (!fs.existsSync(packageJsonPath)) {
  console.log('📦 responsive-system: No se encontró package.json, saltando postinstall')
  process.exit(0)
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
const deps = { ...packageJson.dependencies, ...packageJson.devDependencies }

// Verificar si React está instalado
const hasReact = deps.react || fs.existsSync(path.join(projectRoot, 'node_modules', 'react'))
const hasTailwind = deps.tailwindcss || fs.existsSync(path.join(projectRoot, 'node_modules', 'tailwindcss'))

let needsInstall = false
const packagesToInstall = []

if (!hasReact) {
  packagesToInstall.push('react@^19.1.1', 'react-dom@^19.1.1')
  needsInstall = true
}

if (!hasTailwind) {
  packagesToInstall.push('tailwindcss@^4.1.14', 'postcss@^8.5.6', 'autoprefixer@^10.4.21')
  needsInstall = true
}

if (needsInstall && packagesToInstall.length > 0) {
  console.log('📦 responsive-system: Instalando dependencias faltantes...')
  console.log(`   Instalando: ${packagesToInstall.join(', ')}`)
  
  try {
    execSync(`npm install ${packagesToInstall.join(' ')}`, {
      stdio: 'inherit',
      cwd: projectRoot
    })
    console.log('✅ responsive-system: Dependencias instaladas correctamente')
  } catch (error) {
    console.warn('⚠️  responsive-system: Error al instalar dependencias automáticamente')
    console.warn('   Por favor, instala manualmente:')
    console.warn(`   npm install ${packagesToInstall.join(' ')}`)
  }
} else {
  console.log('✅ responsive-system: Todas las dependencias están instaladas')
}

// Verificar si tailwind.config.js existe
const tailwindConfigPath = path.join(projectRoot, 'tailwind.config.js')
if (!fs.existsSync(tailwindConfigPath)) {
  console.log('💡 responsive-system: No se encontró tailwind.config.js')
  console.log('   Ejecuta: npx tailwindcss init -p')
}

