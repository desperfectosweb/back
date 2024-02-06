import { Request, Response } from 'express'
import { IIncidenceImage } from '../types/incidence'
import { createIncidence, getIncidenceById, getIncidences, updateIncidenceById } from '../services/incidence.service'
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

export const getIncidence = async (req: Request, res: Response) => {
  try {
    const incidenceId = req.params.id
    const incidence = await getIncidenceById(incidenceId)

    if (!incidence.success) return res.status(incidence.status ?? 500).json({ success: false, data: incidence })

    return res.status(200).json({ success: true, data: incidence })
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Error fetching incidence')
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

export const updateIncidence = async (req: Request, res: Response) => {
  try {
    const incidenceId = req.params.id
    const incidence = await getIncidenceById(incidenceId)

    if (!incidence.success || !incidence.data) {
      return res.status(incidence.status ?? 500).json({ success: false, data: incidence })
    }

    if (
      (req.userData.role === 0 && incidence.data.userId.toString() !== req.userData.id) || // Default user can only update their own incidences
      (req.userData.role === 1 && incidence.data.assignedTo.toString() !== req.userData.id) // Town hall user can only update incidences assigned to them
    ) {
      return res.status(403).json({ success: false, errorMessages: 'You are not authorized to update this incidence' })
    }

    const updatedIncidence = await updateIncidenceById(incidenceId, req.body)

    if (!updatedIncidence.success) {
      return res.status(updatedIncidence.status ?? 500).json({ success: false, data: updatedIncidence })
    }
    return res.status(200).json({ success: true, data: incidence })
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Error fetching incidence')
    console.error(errorMessage)
    res.status(500).json({ success: false, errorMessages: errorMessage })
  }
}
