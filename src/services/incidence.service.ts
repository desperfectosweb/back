import mongoose from 'mongoose'
import Incidence from '../models/incidence.model'
import { IIncidence, IIncidenceImage } from '../types/incidence'
import { IResponse } from '../types/response'
import { getErrorMessage } from '../utils/utils'

export interface ICreateIncidence {
  userId: string
  location: number
  basicDescription: string
  assignedTo: string
  images?: IIncidenceImage[]
}
export const createIncidence = async (incidenceData: ICreateIncidence): Promise<IResponse<IIncidence>> => {
  try {
    console.log('Creating incidence', incidenceData)
    // Check if the incidence already exists
    const incidenceExists = await Incidence.findOne({
      location: incidenceData.location,
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
      location: incidenceData.location,
      basicDescription: incidenceData.basicDescription,
      userId: incidenceData.userId,
      assignedTo: incidenceData.assignedTo,
      images: incidenceData.images,
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

export const getAllIncidences = async (): Promise<IResponse<IIncidence[]>> => {
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
