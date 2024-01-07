import mongoose from 'mongoose'
import ENV from './config.env'

export const dbConnection = async () => {
  try {
    console.log('dbConnection')
    await mongoose.connect(ENV.MONGO_URI)
    console.log('MongoDB Connected...')
  } catch (err) {
    console.error('Error connecting to MongoDB', err)
  }
}
