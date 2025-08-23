// @ts-check
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

import analogjsangular from '@analogjs/astro-angular'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [analogjsangular()],
  build: {
    assets: 'assets',
  },
  experimental: {
    staticImportMetaEnv: true,
  },
  devToolbar: {
    enabled: false,
  },
})
