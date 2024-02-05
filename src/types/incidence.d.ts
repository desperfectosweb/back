export interface IIncidence {
  incidenceLocation: number
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

export interface IIncidenceImage {
  uri: string
  format: string
}
