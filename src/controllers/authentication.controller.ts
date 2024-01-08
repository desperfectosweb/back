import { Request, Response } from 'express'
import { IResponse } from '../types/response'
import { IUser } from '../types/user'
import { getErrorMessage } from '../utils/utils'
import { createUser, getUserByEmail } from '../services/authentication.service'
import jwt from 'jsonwebtoken'
import ENV from '../config/config.env'

export const register = async (req: Request, res: Response) => {
  const response: IResponse<IUser> = {
    success: false,
  }
  try {
    const userData = req.body as IUser

    const response = await createUser(userData)
    res.status(response.status ?? 201).json(response)
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Error registering user')
    console.error(errorMessage)
    res.status(500).json({ ...response, errorMessages: errorMessage })
  }
}

interface ILoginRequest {
  email: string
  password: string
}
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as ILoginRequest
    if (!email) {
      return res.status(400).json({ success: false, errorMessages: 'Email is required' })
    }
    if (!password) {
      return res.status(400).json({ success: false, errorMessages: 'Password is required' })
    }

    const user = await getUserByEmail(email)
    if (!user.success || !user.data) {
      return res.status(user.status ?? 404).json(user)
    }

    const comparedPassword = await user.data.comparePassword(password)

    if (!comparedPassword) {
      return res.status(400).json({ success: false, errorMessages: 'Invalid password' })
    }

    // User is valid, create JWT
    const token = jwt.sign(
      { userData: user.data },
      ENV.JWT_SECRET,
      { expiresIn: '1d' }, // token expires in 1 day
    )

    // Send token to the client
    res.status(200).json({ success: true, token })
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Error logging in user')
    console.error(errorMessage)
    res.status(500).json({ success: false, errorMessages: errorMessage })
  }
}
