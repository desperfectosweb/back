import jwt from 'jsonwebtoken'
import { RequestHandler } from 'express'
import { UserPayload } from '../../@types/index.d'
import ENV from '../config/config.env'

export const verifyToken: RequestHandler = (req, res, next) => {
  // Get the token from the 'Authorization' header
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ success: false, errorMessages: 'Access denied. No token provided.' })
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as UserPayload

    // Add user from the token to the request object
    req.userData = decoded.userData

    // Proceed to the next middleware function
    next()
  } catch (error) {
    return res.status(400).json({ success: false, errorMessages: 'Invalid token.' })
  }
}

export const isAdminUser: RequestHandler = (req, res, next) => {
  if (req.userData.role !== 3) {
    return res.status(403).json({ success: false, errorMessages: 'Access denied.' })
  }
  next()
}
