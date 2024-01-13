import { Request, Response } from 'express'
import { IIncidenceImage } from '../types/incidence'
import { createIncidence } from '../services/incidence.service'
import { getErrorMessage } from '../utils/utils'

export interface ICreateNewIncidenceBody {
  location: number
  basicDescription: string
  assignedTo: string
  images: IIncidenceImage[]
}
export const createNewIncidence = async (req: Request, res: Response) => {
  try {
    const { location, basicDescription, assignedTo, images } = req.body as ICreateNewIncidenceBody

    // Validate required fields
    if (!location || !basicDescription! || !assignedTo || !images) {
      return res.status(400).json({ success: false, errorMessages: 'Missing required fields' })
    }

    const response = await createIncidence({
      location,
      basicDescription,
      assignedTo,
      images,
      userId: req.userData?.id as string,
    })
    if (!response.success) return res.status(response.status ?? 500).json(response)

    res.status(response.status ?? 201).json(response)
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Error creating incidence')
    console.error(errorMessage)
    res.status(500).json({ success: false, errorMessages: errorMessage })
  }
}
