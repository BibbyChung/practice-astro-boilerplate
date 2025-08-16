import type { AstroGlobal } from 'astro'

// astro context
export const getAstroContext = (astro: AstroGlobal) => {
  const context = {
    req: astro.request,
    resHeaders: astro.response.headers,
    user: { name: '', token: '' },
  }
  return context
}
