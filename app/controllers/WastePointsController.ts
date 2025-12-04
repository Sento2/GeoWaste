import type { HttpContext } from '@adonisjs/core/http'
import WastePoint from '../models/WastePoint.js'

export default class WastePointsController {
  async index({ request, response }: HttpContext) {
    const { status, waste_type, near, radius = 1000, page = 1, limit = 20 } = request.qs()
    const query: any = {}
    if (status) query.status = status
    if (waste_type) query.waste_type = waste_type
    if (near) {
      const [lon, lat] = String(near).split(',').map(Number)
      query.coordinates = {
        $near: {
          $geometry: { type: 'Point', coordinates: [lon, lat] },
          $maxDistance: Number(radius),
        },
      }
    }
    const skip = (Number(page) - 1) * Number(limit)
    const [data, total] = await Promise.all([
      WastePoint.find(query).skip(skip).limit(Number(limit)).sort({ updated_at: -1 }),
      WastePoint.countDocuments(query),
    ])
    return response.send({ data, meta: { page: Number(page), limit: Number(limit), total } })
  }

  async store(ctx: HttpContext) {
    const { name, description, waste_type, lon, lat, coordinates } = ctx.request.only([
      'name',
      'description',
      'waste_type',
      'lon',
      'lat',
      'coordinates',
    ])

    // Support both formats: {lon, lat} or {coordinates: [lon, lat]}
    let finalCoords: number[]
    if (coordinates && Array.isArray(coordinates)) {
      finalCoords = coordinates
    } else if (lon != null && lat != null) {
      finalCoords = [Number(lon), Number(lat)]
    } else {
      return ctx.response.status(400).send({ error: 'coordinates or (lon, lat) required' })
    }

    if (!name) return ctx.response.status(400).send({ error: 'name required' })

    // @ts-ignore - user diisi oleh middleware auth
    const userId = ctx.user?.id
    const wp = await WastePoint.create({
      name,
      description,
      waste_type,
      coordinates: finalCoords,
      created_by: userId,
    })
    return ctx.response
      .status(201)
      .send({ message: 'created', data: { _id: wp._id, name: wp.name } })
  }
  async update({ params, request, response }: HttpContext) {
    const changes = request.only(['name', 'description', 'waste_type', 'status'])
    const wp = await WastePoint.findByIdAndUpdate(params.id, changes, { new: true })
    if (!wp) return response.status(404).send({ error: 'Not found' })
    return response.send({ message: 'updated', data: wp })
  }

  async destroy({ params, response }: HttpContext) {
    const wp = await WastePoint.findByIdAndDelete(params.id)
    if (!wp) return response.status(404).send({ error: 'Not found' })
    return response.send({ message: 'deleted' })
  }
}
