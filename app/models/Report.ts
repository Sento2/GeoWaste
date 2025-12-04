import mongoose from '../../config/Mongo.js'
const { Schema, model, models } = mongoose

const ReportSchema = new Schema(
  {
    site_id: { type: Schema.Types.ObjectId, ref: 'WastePoint', required: true },
    reporter_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String },
    photo_url: { type: String },
    status: { type: String, enum: ['baru', 'diproses', 'selesai'], default: 'baru' },
    reported_at: { type: Date, default: () => new Date() },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

export default (models.Report as any) || model('Report', ReportSchema)
