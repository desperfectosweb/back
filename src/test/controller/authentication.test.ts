import { Request, Response } from 'express'
import httpMocks, { MockRequest, MockResponse } from 'node-mocks-http'
import jwt from 'jsonwebtoken'
import { IUser } from '../../types/user'
import { IResponse } from '../../types/response'
import { getErrorMessage } from '../../utils/utils'
import { createUser, getUserByEmail } from '../../services/authentication.service'
import { login, register } from '../../controllers/authentication.controller'

jest.mock('../../services/authentication.service')
jest.mock('../../utils/utils')
jest.mock('jsonwebtoken')

describe('register', () => {
  let req: MockRequest<Request>, res: MockResponse<Response>

  beforeEach(() => {
    req = httpMocks.createRequest({
      method: 'POST',
      url: '/register',
      body: {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword',
      },
    })

    res = httpMocks.createResponse()
  })

  it('should return a user when registration is successful', async () => {
    const mockUser: IResponse<IUser> = {
      success: true,
      status: 201,
      data: {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword',
        internalUser: false,
        role: 0,
      },
    }

    ;(createUser as jest.Mock).mockResolvedValue(mockUser)

    await register(req, res)

    const data = JSON.parse(res._getData())

    expect(res._getStatusCode()).toBe(201)
    expect(data).toEqual(mockUser)
  })

  it('should return 500 when registration fails', async () => {
    const mockError = new Error('Error registering user')
    ;(createUser as jest.Mock).mockRejectedValue(mockError)
    ;(getErrorMessage as jest.Mock).mockReturnValue('Error registering user')

    await register(req, res)

    const data = JSON.parse(res._getData())

    expect(res._getStatusCode()).toBe(500)
    expect(data).toEqual({
      success: false,
      errorMessages: 'Error registering user',
    })
  })
})

interface MockRequestParams {
  email?: string
  password?: string
  token?: string
}

const mockRequest = (body: MockRequestParams) => {
  return {
    body,
  } as Request
}

const mockResponse = () => {
  const res = {} as Response
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}

describe('login', () => {
  it('should return 400 if no email is provided', async () => {
    const req = mockRequest({ password: 'password' })
    const res = mockResponse()

    await login(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ success: false, errorMessages: 'Email is required' })
  })

  it('should return 400 if no password is provided', async () => {
    const req = mockRequest({ email: 'email@test.com' })
    const res = mockResponse()

    await login(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ success: false, errorMessages: 'Password is required' })
  })

  it('should return 404 if the user does not exist', async () => {
    const req = mockRequest({ email: 'email@test.com', password: 'password' })
    const res = mockResponse()

    ;(getUserByEmail as jest.Mock).mockResolvedValue({ success: false })

    await login(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ success: false })
  })

  it('should return 400 if the password is incorrect', async () => {
    const req = mockRequest({ email: 'email@test.com', password: 'password' })
    const res = mockResponse()

    const mockUser = { data: { comparePassword: jest.fn().mockResolvedValue(false) }, success: true }
    ;(getUserByEmail as jest.Mock).mockResolvedValue(mockUser)

    await login(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ success: false, errorMessages: 'Invalid password' })
  })

  it('should return a token if the email and password are valid', async () => {
    const req = mockRequest({ email: 'email@test.com', password: 'password' })
    const res = mockResponse()

    const mockUser = { data: { comparePassword: jest.fn().mockResolvedValue(true) }, success: true }
    ;(getUserByEmail as jest.Mock).mockResolvedValue(mockUser)
    ;(jwt.sign as jest.Mock).mockReturnValue('token')

    await login(req, res)

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ token: 'token' }))
  })
})
