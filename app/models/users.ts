import mongoose from '../../config/Mongo.js'
const { Schema, model, models } = mongoose

export type Role = 'admin' | 'petugas' | 'warga'

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'petugas', 'warga'], default: 'warga' },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

export default (models.User as any) || model('User', UserSchema)
