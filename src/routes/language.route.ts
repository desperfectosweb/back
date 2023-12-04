import express from 'express'
import { getAllLanguages } from '../controllers/language.controller'

const languageRouter = express.Router()

languageRouter.get('/', getAllLanguages)

export default languageRouter
