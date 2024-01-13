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
  images: [
    {
      uri: string
      format: string
    },
  ]
}
