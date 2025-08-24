// @ts-check
import svelte from '@astrojs/svelte'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [svelte(), react()],
  experimental: {
    staticImportMetaEnv: true,
  },
  devToolbar: {
    enabled: false,
  },
})
