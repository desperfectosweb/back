import express from 'express'
import dotenv from 'dotenv'
import router from './routes/index.route'
import { authenticationMiddleware } from './middlewares/authentication'
dotenv.config()

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

app.use('/api', authenticationMiddleware, router)
