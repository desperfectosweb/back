import User from '../models/user.model'
import { IResponse } from '../types/response'
import { IUser } from '../types/user'
import { getErrorMessage } from '../utils/utils'

export const createUser = async (userData: IUser): Promise<IResponse<IUser>> => {
  try {
    // Verify if user already exists
    const existingUser = await User.findOne({ email: userData.email })
    if (existingUser) {
      return {
        success: false,
        status: 400,
        errorMessages: 'User already exists',
      }
    }

    // Create new user
    const newUser = new User(userData)

    // Save and return the user
    const savedUser = await newUser.save()
    return {
      success: true,
      status: 201,
      data: savedUser,
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Error registering user')
    console.error(errorMessage)
    return {
      success: false,
      status: 500,
      errorMessages: errorMessage,
    }
  }
}
