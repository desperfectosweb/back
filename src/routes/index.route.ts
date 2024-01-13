import { Router } from 'express'
import authenticationRouter from './authentication.route'
import incidenceRouter from './incidence.route'
import verifyToken from '../middlewares/authentication'

const router = Router()

router.use('/auth', authenticationRouter)
router.use('/incidences', verifyToken, incidenceRouter)

export default router
