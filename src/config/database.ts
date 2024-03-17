import mongoose from 'mongoose'
import ENV from './config.env'

export const dbConnection = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI)
    console.info('MongoDB Connected...')
  } catch (err) {
    console.error('Error connecting to MongoDB', err)
  }
}
