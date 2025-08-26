import type { APIContext, MiddlewareNext } from 'astro'
import { sequence } from 'astro:middleware'

async function validation(_: APIContext, next: MiddlewareNext) {
  console.log('validation request')
  const response = await next()
  console.log('validation response')
  console.log('--------')
  return response
}

async function auth(_: APIContext, next: MiddlewareNext) {
  console.log('auth request')
  _.locals.user = { name: 'bb' }
  const response = await next()
  console.log('auth response')
  return response
}

async function greeting(_: APIContext, next: MiddlewareNext) {
  console.log('greeting request')
  const response = await next()
  console.log('greeting response')
  return response
}

export const onRequest = sequence(validation, auth, greeting)
