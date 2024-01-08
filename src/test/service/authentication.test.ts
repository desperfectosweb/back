import User from '../../models/user.model'
import { createUser } from '../../services/authentication.service'
import { IUser } from '../../types/user'

jest.mock('../../models/user.model')

const mockUser: IUser = {
  email: 'test@test.com',
  username: 'test',
  password: 'password',
  internalUser: false,
  role: 0,
}

describe('createUser', () => {
  it('should create a new user', async () => {
    ;(User.findOne as jest.Mock).mockResolvedValue(null)
    ;(User.prototype.save as jest.Mock).mockResolvedValue(mockUser)

    const result = await createUser(mockUser)

    expect(result).toEqual({
      success: true,
      status: 201,
      data: mockUser,
    })
  })

  it('should return an error if the user already exists', async () => {
    ;(User.findOne as jest.Mock).mockResolvedValue(mockUser)

    const result = await createUser(mockUser)

    expect(result).toEqual({
      success: false,
      status: 400,
      errorMessages: 'User already exists',
    })
  })
})
