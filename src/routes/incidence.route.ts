import express from 'express'
import { createNewIncidence, getAllIncidences, getIncidence } from '../controllers/incidence.controller'
import { isAdminUser } from '../middlewares/authentication'

const incidenceRouter = express.Router()

incidenceRouter.post('/', createNewIncidence)

incidenceRouter.get('/:id', getIncidence)
incidenceRouter.get('/', isAdminUser, getAllIncidences)

export default incidenceRouter
