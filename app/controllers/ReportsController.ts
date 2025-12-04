import type { HttpContext } from '@adonisjs/core/http'
import Report from '../models/Report.js'

export default class ReportsController {
  async index({ request, response }: HttpContext) {
    const { site_id, status, page = 1, limit = 20 } = request.qs()
    const query: any = {}
    if (site_id) query.site_id = site_id
    if (status) query.status = status
    const skip = (Number(page) - 1) * Number(limit)
    const [data, total] = await Promise.all([
      Report.find(query).skip(skip).limit(Number(limit)).sort({ created_at: -1 }),
      Report.countDocuments(query),
    ])
    return response.send({ data, meta: { page: Number(page), limit: Number(limit), total } })
  }

  async store(ctx: HttpContext) {
    const { site_id, description, photo_url } = ctx.request.only([
      'site_id',
      'description',
      'photo_url',
    ])
    if (!site_id) return ctx.response.status(400).send({ error: 'site_id required' })
    // @ts-ignore - user diisi oleh middleware auth
    const reporterId = ctx.user?.id
    const rpt = await Report.create({ site_id, reporter_id: reporterId, description, photo_url })
    return ctx.response
      .status(201)
      .send({ message: 'report created', data: { _id: rpt._id, status: rpt.status } })
  }

  async updateStatus({ params, request, response }: HttpContext) {
    const body = request.body()
    const status = body.status

    if (!status || !['baru', 'diproses', 'selesai'].includes(status)) {
      return response.status(400).send({ error: 'invalid status. Use: baru, diproses, selesai' })
    }

    const rpt = await Report.findByIdAndUpdate(params.id, { status }, { new: true })
    if (!rpt) return response.status(404).send({ error: 'Not found' })
    return response.send({ message: 'status updated', data: { _id: rpt._id, status: rpt.status } })
  }

  async destroy({ params, response }: HttpContext) {
    const rpt = await Report.findByIdAndDelete(params.id)
    if (!rpt) return response.status(404).send({ error: 'Not found' })
    return response.send({ message: 'Report deleted' })
  }
}
