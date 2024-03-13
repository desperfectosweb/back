import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { verifyToken } from '../../middlewares/authentication'

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}))

const mockRequest = (token: string) => {
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  } as Request
}

const mockResponse = () => {
  const res = {} as Response
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}

describe('verifyToken', () => {
  it('should return 401 if no token is provided', () => {
    const req = mockRequest('')
    const res = mockResponse()
    const next = jest.fn()

    verifyToken(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ success: false, errorMessages: 'Access denied. No token provided.' })
  })

  it('should return 400 if the token is invalid', () => {
    const req = mockRequest('invalidToken')
    const res = mockResponse()
    const next = jest.fn()

    ;(jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error()
    })

    verifyToken(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ success: false, errorMessages: 'Invalid token.' })
  })

  it('should call next if the token is valid', () => {
    const req = mockRequest('validToken')
    const res = mockResponse()
    const next = jest.fn()

    ;(jwt.verify as jest.Mock).mockReturnValue({})

    verifyToken(req, res, next)

    expect(next).toHaveBeenCalled()
  })
})
