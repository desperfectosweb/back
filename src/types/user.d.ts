export interface IUser {
  email: string
  username: string
  password: string
  role: number
  internalUser: boolean
}

export interface IUserSession {
  id: string
  email: string
  username: string
  role: number
}
