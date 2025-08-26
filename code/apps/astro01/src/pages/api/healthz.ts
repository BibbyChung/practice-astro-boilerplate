import type { APIRoute } from 'astro'
import { getUUID } from '~/lib/common/util'

export const prerender = false

export const GET: APIRoute = () => {
  const uuid = getUUID()

  return new Response(JSON.stringify({ uuid }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
