// config/Mongo.ts
import env from '#start/env'
import mongoose from 'mongoose'

if (mongoose.connection.readyState === 0) {
  mongoose
    .connect(env.get('MONGO_URI') || '', {
      dbName: env.get('MONGO_DB_NAME'),
    })
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => console.error('❌ MongoDB connection error:', err))
}

export default mongoose
