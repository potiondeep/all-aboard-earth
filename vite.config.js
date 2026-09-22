import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { resolve } from 'node:path'

// https://vite.dev/config/
// Multi-page: each sub page is its own real HTML entry, so /cool-careers is a
// static URL on Vercel with no rewrites and no client-side router.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        coolCareers: resolve(import.meta.dirname, 'cool-careers/index.html'),
        edutainment: resolve(import.meta.dirname, 'edutainment/index.html'),
        regenArt: resolve(import.meta.dirname, 'regenerative-art/index.html'),
        bookDemo: resolve(import.meta.dirname, 'book-a-demo/index.html'),
      },
    },
  },
})
