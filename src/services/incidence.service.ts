import Incidence from '../models/incidence.model'
import { IIncidence } from '../types/incidence'
import { IResponse } from '../types/response'
import { getErrorMessage } from '../utils/utils'

export const createIncidence = async (incidenceData: IIncidence): Promise<IResponse<IIncidence>> => {
  try {
    // Create new incidence
    const newIncidence = new Incidence(incidenceData)

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
