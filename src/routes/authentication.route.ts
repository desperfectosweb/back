import express from 'express'
import { login, register } from '../controllers/authentication.controller'
import verifyToken from '../middlewares/authentication'

const authenticationRouter = express.Router()

authenticationRouter.post('/register', verifyToken, register)
authenticationRouter.post('/login', login)

export default authenticationRouter
