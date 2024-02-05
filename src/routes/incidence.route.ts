import express from 'express'
import { createNewIncidence, getAllIncidences } from '../controllers/incidence.controller'
import { isAdminUser } from '../middlewares/authentication'

const incidenceRouter = express.Router()

incidenceRouter.post('/', createNewIncidence)
incidenceRouter.get('/', isAdminUser, getAllIncidences)

export default incidenceRouter
