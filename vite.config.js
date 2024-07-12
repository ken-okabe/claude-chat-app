import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'backend/Extension.fs.js'),
      formats: ['cjs'],
      fileName: 'extension'
    },
    rollupOptions: {
      external: ['vscode']
    },
    outDir: 'out',
    emptyOutDir: true,
    sourcemap: true,
    target: 'node14',
  },
  resolve: {
    extensions: ['.js', '.fs', '.fs.js']
  }
})