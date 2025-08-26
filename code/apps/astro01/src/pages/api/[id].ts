import type { APIRoute } from 'astro'
import { getUUID } from '~/lib/common/util'

export const prerender = false

export const GET: APIRoute = ({ params }) => {
  const uuid = getUUID()
  const { id } = params
  const obj = {
    info: {
      id,
      uuid,
    },
  }

  return new Response(JSON.stringify(obj), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
