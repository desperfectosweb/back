import { Router } from 'express'
import languageRouter from './language.route'
import locationRouter from './location.route'
import photoRouter from './photo.route'
import reportRouter from './report.route'
import userRouter from './user.route'

const router = Router()

router.use('/languages', languageRouter)
router.use('/location', locationRouter)
router.use('/photo', photoRouter)
router.use('/report', reportRouter)
router.use('/user', userRouter)

export default router
