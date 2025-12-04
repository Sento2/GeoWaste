import mongoose from '../../config/Mongo.js'
const { Schema, model, models } = mongoose

const WastePointSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    waste_type: { type: String, enum: ['organik', 'anorganik', 'B3', 'campuran'], required: true },
    status: { type: String, enum: ['baru', 'ditinjau', 'selesai'], default: 'baru' },
    coordinates: { type: [Number], required: true, validate: (v: number[]) => v.length === 2 }, // [lon, lat]
    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)
WastePointSchema.index({ coordinates: '2dsphere' })

export default (models.WastePoint as any) || model('WastePoint', WastePointSchema)
