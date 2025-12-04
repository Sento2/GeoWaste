import type { HttpContext } from '@adonisjs/core/http'
import bcrypt from 'bcryptjs'
import * as jsonwebtoken from 'jsonwebtoken'
import User from '../models/users.js'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const { name, email, password, role } = request.only(['name', 'email', 'password', 'role'])
    const exists = await User.findOne({ email })
    if (exists) return response.status(400).send({ error: 'Email already used' })

    const hash = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hash, role: role || 'warga' })

    return response.status(201).send({ user: this.safeUser(user), token: this.sign(user) })
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.findOne({ email })
    if (!user) return response.status(401).send({ error: 'Invalid credentials' })

    const ok = await bcrypt.compare(password, user.password)
    if (!ok) return response.status(401).send({ error: 'Invalid credentials' })

    return response.send({ user: this.safeUser(user), token: this.sign(user) })
  }

  async me(ctx: HttpContext) {
    // @ts-ignore - user diisi oleh middleware auth
    return ctx.response.send(ctx.user)
  }

  private sign(user: any) {
    const secret = (process.env.JWT_SECRET ?? 'secret') as jsonwebtoken.Secret
    const exp = process.env.JWT_EXPIRES_IN ?? '1d'

    const payload = { name: user.name, email: user.email, role: user.role }
    const options: jsonwebtoken.SignOptions = {
      expiresIn: exp as any, // cast kecil supaya TS gak rewel
      subject: String(user._id),
    }

    // FALLBACK: dukung kedua bentuk export (CJS & ESM)
    const mod: any = jsonwebtoken as any
    const signFn = mod.sign ?? mod.default?.sign
    if (!signFn) throw new Error('jsonwebtoken.sign not found (check your jsonwebtoken version)')

    return signFn(payload, secret, options)
  }

  private safeUser(u: any) {
    return { _id: u._id, name: u.name, email: u.email, role: u.role }
  }
}
