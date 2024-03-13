import express from 'express'
import {
  createNewIncidence,
  getAllIncidences,
  getIncidence,
  updateIncidence,
} from '../controllers/incidence.controller'
import { isAdminUser } from '../middlewares/authentication'

const incidenceRouter = express.Router()

incidenceRouter.post('/', createNewIncidence)

incidenceRouter.get('/:id', getIncidence)
incidenceRouter.get('/', isAdminUser, getAllIncidences)

incidenceRouter.patch('/:id', updateIncidence)

export default incidenceRouter
