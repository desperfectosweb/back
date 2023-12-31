import { Request, Response } from 'express'
import { IResponse } from '../types/response'

export const getAllLanguages = async (req: Request, res: Response): Promise<void> => {
  const response: IResponse<{ lang: string[] }> = {
    success: false,
  }
  try {
    console.log('getAllLanguages')
    // const languages = await findAllLangauges()
    response.success = true
    // response.data = languages
    response.data = { lang: ['es', 'en'] }
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      response.errorMessages = error.message
    }
    res.status(500).json(response)
  }
}
