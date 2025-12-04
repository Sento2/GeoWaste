import type { HttpContext } from '@adonisjs/core/http'
import bcrypt from 'bcryptjs'
import User from '../models/users.js'

export default class UsersController {
  async index({ request, response }: HttpContext) {
    const { role, page = 1, limit = 20 } = request.qs()
    const query: any = {}
    if (role) query.role = role
    const skip = (Number(page) - 1) * Number(limit)
    const [data, total] = await Promise.all([
      User.find(query, { password: 0 }).skip(skip).limit(Number(limit)).sort({ created_at: -1 }),
      User.countDocuments(query),
    ])
    return response.send({ data, meta: { page: Number(page), limit: Number(limit), total } })
  }

  async show({ params, response }: HttpContext) {
    const user = await User.findById(params.id, { password: 0 })
    if (!user) return response.status(404).send({ error: 'Not found' })
    return response.send(user)
  }

  async store({ request, response }: HttpContext) {
    // admin create
    const {
      name,
      email,
      password,
      role = 'warga',
    } = request.only(['name', 'email', 'password', 'role'])
    const exists = await User.findOne({ email })
    if (exists) return response.status(400).send({ error: 'Email already used' })
    const hash = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hash, role })
    return response
      .status(201)
      .send({ message: 'created', data: { _id: user._id, name: user.name, role: user.role } })
  }

  async update({ params, request, response }: HttpContext) {
    const { name, email, password, role } = request.only(['name', 'email', 'password', 'role'])
    const changes: any = {}
    if (name) changes.name = name
    if (email) changes.email = email
    if (role) changes.role = role
    if (password) changes.password = await bcrypt.hash(password, 10)
    const user = await User.findByIdAndUpdate(params.id, changes, {
      new: true,
      projection: { password: 0 },
    })
    if (!user) return response.status(404).send({ error: 'Not found' })
    return response.send({ message: 'updated', data: user })
  }

  async destroy({ params, response }: HttpContext) {
    const u = await User.findByIdAndDelete(params.id)
    if (!u) return response.status(404).send({ error: 'Not found' })
    return response.send({ message: 'deleted' })
  }
}
