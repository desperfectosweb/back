import { RequestHandler } from 'express'

export const authenticationMiddleware: RequestHandler = async (req, res, next) => {
  next()
}
