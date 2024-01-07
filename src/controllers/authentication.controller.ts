import { Request, Response } from 'express'
import { IResponse } from '../types/response'
import { IUser } from '../types/user'
import { getErrorMessage } from '../utils/utils'
import { createUser } from '../services/authentication.service'

export const register = async (req: Request, res: Response) => {
  const response: IResponse<IUser> = {
    success: false,
  }
  try {
    console.log('register')
    const userData = req.body as IUser

    const response = await createUser(userData)
    res.status(response.status ?? 201).json(response)
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Error registering user')
    console.error(errorMessage)
    res.status(500).json({ ...response, errorMessages: errorMessage })
  }
}
