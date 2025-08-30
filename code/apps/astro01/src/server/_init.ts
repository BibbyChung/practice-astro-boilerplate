import type { ZodType, z } from 'zod'
import { trpcContext, type Context } from './_context'
import { userRouter } from './user.router'

export type AppRouterType = typeof appRouter

export type HandleOptsType<T extends ZodType> = {
  ctx: Context
  input: z.infer<T>
}

export const appRouter = trpcContext.router({
  user: trpcContext.router(userRouter),
})

export const appCaller = trpcContext.createCallerFactory(appRouter)
