import httpMocks, { MockRequest, MockResponse } from 'node-mocks-http'
import { Request, Response } from 'express'
import { IUser } from '../../types/user'
import { IResponse } from '../../types/response'
import { getErrorMessage } from '../../utils/utils'
import { createUser } from '../../services/authentication.service'
import { register } from '../../controllers/authentication.controller'

jest.mock('../../services/authentication.service')
jest.mock('../../utils/utils')

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
