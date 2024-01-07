import express from 'express'
import router from './routes/index.route'
import { authenticationMiddleware } from './middlewares/authentication'
import { dbConnection } from './config/database'
import ENV from './config/config.env'

// Connect to MongoDB
// dotenv.config()

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const PORT = ENV.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

dbConnection()

app.use('/api', authenticationMiddleware, router)
