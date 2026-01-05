import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: resolve(__dirname, 'src'),
      include: [resolve(__dirname, 'src/**/*.ts'), resolve(__dirname, 'src/**/*.tsx')],
      exclude: [
        resolve(__dirname, 'src/**/*.test.ts'),
        resolve(__dirname, 'src/**/*.test.tsx'),
        resolve(__dirname, 'src/pages/**/*'),
        resolve(__dirname, 'src/components/ResponsiveDemo.tsx'),
        resolve(__dirname, 'src/App.tsx'),
        resolve(__dirname, 'src/main.tsx'),
      ],
      outDir: resolve(__dirname, 'dist'),
      rollupTypes: false,
      copyDtsFiles: true,
      insertTypesEntry: false,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ResponsiveSystem',
      formats: ['es', 'cjs'],
      fileName: (format) => `responsive-system.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: (id) => {
        // Externalizar React y todas sus dependencias
        if (id === 'react' || id === 'react-dom' || id === 'react/jsx-runtime') {
          return true
        }
        // Externalizar imports que empiezan con 'react/'
        if (id.startsWith('react/')) {
          return true
        }
        return false
      },
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
    sourcemap: true,
    minify: 'esbuild',
  },
})
