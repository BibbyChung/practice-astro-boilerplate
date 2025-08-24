// @ts-check
import svelte from '@astrojs/svelte'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

import analogjsangular from '@analogjs/astro-angular'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    analogjsangular({
      vite: {
        transformFilter: (_code, id) => {
          // console.log(id)
          return id.includes('src/lib/components/ng') // <- only transform Angular TypeScript files
        },
      },
    }),
    svelte(),
  ],
  experimental: {
    staticImportMetaEnv: true,
  },
  devToolbar: {
    enabled: false,
  },
})
