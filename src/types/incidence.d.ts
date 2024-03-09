import { IIncidenceImage } from "./IIncidenceImage"
import { ILocation } from "./location"

export interface IIncidence {
  incidenceLocation: ILocation
  basicDescription: string
  userId: string
  assignedTo: string
  status: number
  comments?: [
    {
      comment: string
    },
  ]
  incidenceImages?: IIncidenceImage[]
}


