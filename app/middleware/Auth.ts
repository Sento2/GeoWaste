// app/middleware/Auth.ts
import type { HttpContext } from '@adonisjs/core/http'
import jwt from 'jsonwebtoken'

export default async function auth(ctx: HttpContext, next: () => Promise<void>) {
  const header = ctx.request.header('authorization') || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) {
    return ctx.response.status(401).send({ error: 'Unauthorized' })
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any
    // @ts-ignore put user into ctx for later use
    ctx.user = { id: payload.sub, role: payload.role, name: payload.name, email: payload.email }
    await next()
  } catch {
    return ctx.response.status(401).send({ error: 'Invalid token' })
  }
}
