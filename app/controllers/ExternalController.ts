// app/controllers/external_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import { getEnvSummary } from '../Services/external_env_service.js'

export default class ExternalController {
  public async envSummary({ request, response }: HttpContext) {
    try {
      const lat = Number(request.input('lat'))
      const lon = Number(request.input('lon'))

      if (Number.isNaN(lat) || Number.isNaN(lon)) {
        return response.badRequest({
          message: 'lat dan lon wajib diisi dan harus berupa angka',
        })
      }

      const summary = await getEnvSummary(lat, lon)

      return response.ok({
        message: 'OK',
        data: summary,
      })
    } catch (error) {
      console.error('Error envSummary:', error)
      return response.internalServerError({
        message: 'Gagal mengambil data eksternal',
      })
    }
  }
}
