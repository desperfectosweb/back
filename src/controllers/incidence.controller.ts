import { Request, Response } from 'express'
import { IIncidenceImage } from '../types/incidence'
import { createIncidence, getIncidences } from '../services/incidence.service'
import { getErrorMessage } from '../utils/utils'

export interface ICreateNewIncidenceBody {
  incidenceLocation: number
  basicDescription: string
  assignedTo: string
  incidenceImages?: IIncidenceImage[]
}
export const createNewIncidence = async (req: Request, res: Response) => {
  try {
    const { incidenceLocation, basicDescription, assignedTo, incidenceImages } = req.body as ICreateNewIncidenceBody

    // Validate required fields
    if (!incidenceLocation || !basicDescription! || !assignedTo) {
      return res.status(400).json({ success: false, errorMessages: 'Missing required fields' })
    }

    const response = await createIncidence({
      incidenceLocation,
      basicDescription,
      userId: req.userData.id,
      assignedTo,
      incidenceImages,
    })
    if (!response.success) return res.status(response.status ?? 500).json({ success: true, data: response })

    res.status(response.status ?? 201).json({ success: true, data: response })
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Error creating incidence')
    console.error(errorMessage)
    res.status(500).json({ success: false, errorMessages: errorMessage })
  }
}

export const getAllIncidences = async (req: Request, res: Response) => {
  try {
    const incidences = await getIncidences()

    if (!incidences.success) return res.status(incidences.status ?? 500).json(incidences)

    return res.status(200).json({ success: true, data: incidences })
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Error fetching incidences')
    console.error(errorMessage)
    res.status(500).json({ success: false, errorMessages: errorMessage })
  }
}
