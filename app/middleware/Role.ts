// app/middleware/Role.ts
import type { HttpContext } from '@adonisjs/core/http'

export default function role(...allowed: string[]) {
  return async function roleMiddleware(ctx: HttpContext, next: () => Promise<void>) {
    // @ts-ignore
    const current = ctx.user?.role
    if (allowed.length && !allowed.includes(current)) {
      return ctx.response.status(403).send({ error: 'Forbidden' })
    }
    await next()
  }
}
