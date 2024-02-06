import Incidence from '../models/incidence.model'
import { IIncidence, IIncidenceImage } from '../types/incidence'
import { IResponse } from '../types/response'
import { getErrorMessage } from '../utils/utils'

export interface ICreateIncidence {
  userId: string
  incidenceLocation: number
  basicDescription: string
  assignedTo: string
  incidenceImages?: IIncidenceImage[]
}
export const createIncidence = async (incidenceData: ICreateIncidence): Promise<IResponse<IIncidence>> => {
  try {
    // Check if the incidence already exists
    const incidenceExists = await Incidence.findOne({
      incidenceLocation: incidenceData.incidenceLocation,
      basicDescription: incidenceData.basicDescription,
      userId: incidenceData.userId,
      assignedTo: incidenceData.assignedTo,
    })
    if (incidenceExists) {
      return {
        success: false,
        status: 400,
        errorMessages: 'Incidence already exists',
      }
    }
    // Create new incidence
    const newIncidence = new Incidence({
      incidenceLocation: incidenceData.incidenceLocation,
      basicDescription: incidenceData.basicDescription,
      userId: incidenceData.userId,
      assignedTo: incidenceData.assignedTo,
      incidenceImages: incidenceData.incidenceImages,
      status: 0,
    })

    // Save and return the incidence
    const savedIncidence = await newIncidence.save()
    return {
      success: true,
      status: 201,
      data: savedIncidence,
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Error creating incidence')
    console.error(errorMessage)
    return {
      success: false,
      status: 500,
      errorMessages: errorMessage,
    }
  }
}

export const getIncidenceById = async (incidenceId: string): Promise<IResponse<IIncidence>> => {
  try {
    const incidence = await Incidence.findById(incidenceId)
    if (!incidence) {
      return {
        success: false,
        status: 404,
        errorMessages: 'Incidence not found',
      }
    }
    return {
      success: true,
      status: 200,
      data: incidence,
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Error getting incidence')
    console.error(errorMessage)
    return {
      success: false,
      status: 500,
      errorMessages: errorMessage,
    }
  }
}

// TODO: Implement params to filter incidences
export const getIncidences = async (): Promise<IResponse<IIncidence[]>> => {
  try {
    const incidences = await Incidence.find()
    return {
      success: true,
      status: 200,
      data: incidences,
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error, 'Error getting incidences')
    console.error(errorMessage)
    return {
      success: false,
      status: 500,
      errorMessages: errorMessage,
    }
  }
}
