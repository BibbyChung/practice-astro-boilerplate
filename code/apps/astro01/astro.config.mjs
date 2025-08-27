// @ts-check
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

import svelte from '@astrojs/svelte'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [svelte()],
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
