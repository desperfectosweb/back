import express from 'express'
import { register } from '../controllers/authentication.controller'

const authenticationRouter = express.Router()

authenticationRouter.post('/register', register)

export default authenticationRouter
