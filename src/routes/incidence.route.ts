import express from 'express'
import { createNewIncidence } from '../controllers/incidence.controller'

const incidenceRouter = express.Router()

incidenceRouter.post('/', createNewIncidence)

export default incidenceRouter
