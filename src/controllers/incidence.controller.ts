import { Request, Response } from 'express'
import { IIncidenceImage } from '../types/incidence'
import { createIncidence, getAllIncidences } from '../services/incidence.service'
import { getErrorMessage } from '../utils/utils'

export interface ICreateNewIncidenceBody {
  location: number
  basicDescription: string
  assignedTo: string
  images?: IIncidenceImage[]
}
export const createNewIncidence = async (req: Request, res: Response) => {
  try {
    const { location, basicDescription, assignedTo, images } = req.body as ICreateNewIncidenceBody

    // Validate required fields
    if (!location || !basicDescription! || !assignedTo) {
      return res.status(400).json({ success: false, errorMessages: 'Missing required fields' })
    }

    const response = await createIncidence({
      location,
      basicDescription,
      userId: req.userData.id,
      assignedTo: assignedTo,
      images,
    })
    if (!response.success) return res.status(response.status ?? 500).json(response)

    res.status(response.status ?? 201).json({ success: true, data: response })
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Error creating incidence')
    console.error(errorMessage)
    res.status(500).json({ success: false, errorMessages: errorMessage })
  }
}

export const getHallIncidences = async (req: Request, res: Response) => {
  try {
    const incidences = await getAllIncidences()

    if (!incidences.success) return res.status(incidences.status ?? 500).json(incidences)

    return res.status(200).json({ success: true, data: incidences })
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Error fetching incidences')
    console.error(errorMessage)
    res.status(500).json({ success: false, errorMessages: errorMessage })
  }
}
