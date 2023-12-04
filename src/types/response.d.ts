export interface IResponse<T> {
  status?: number
  success: boolean
  errorMessages?: string
  data?: T
}
