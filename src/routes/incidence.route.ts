import express from 'express'
import { createNewIncidence, getHallIncidences } from '../controllers/incidence.controller'
import { isAdminUser } from '../middlewares/authentication'

const incidenceRouter = express.Router()

incidenceRouter.post('/', createNewIncidence)
incidenceRouter.post('/', isAdminUser, getHallIncidences)

export default incidenceRouter
