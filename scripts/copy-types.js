#!/usr/bin/env node

/**
 * Script para copiar los tipos generados por tsc antes de que vite los procese
 */

import { copyFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'fs'
import { resolve, dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = resolve(__dirname, '..')
const distPath = resolve(projectRoot, 'dist')
const tempTypesPath = resolve(projectRoot, '.temp-types')

// Crear directorio temporal para guardar los tipos antes de que vite los procese
if (!existsSync(tempTypesPath)) {
  mkdirSync(tempTypesPath, { recursive: true })
}

// Copiar todos los .d.ts de dist a .temp-types
function copyTypesRecursive(src, dest) {
  if (!existsSync(src)) return
  
  const entries = readdirSync(src, { withFileTypes: true })
  
  for (const entry of entries) {
    const srcPath = join(src, entry.name)
    const destPath = join(dest, entry.name)
    
    if (entry.isDirectory()) {
      if (!existsSync(destPath)) {
        mkdirSync(destPath, { recursive: true })
      }
      copyTypesRecursive(srcPath, destPath)
    } else if (entry.name.endsWith('.d.ts')) {
      copyFileSync(srcPath, destPath)
    }
  }
}

// Copiar tipos de dist a .temp-types
copyTypesRecursive(distPath, tempTypesPath)
console.log('✅ Copied types to temporary directory')

