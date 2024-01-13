export interface IIncidence {
  location: number
  basicDescription: string
  userId: string
  assignedTo: string
  status: number
  comments: [
    {
      comment: string
    },
  ]
  images: IIncidenceImage[]
}

export interface IIncidenceImage {
  uri: string
  format: string
}
