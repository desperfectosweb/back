import * as express from 'express'

import { IUser } from '../src/types/user'

declare global {
  namespace Express {
    interface Request {
      userData?: IUser
    }
  }
}

export interface UserPayload {
  iat: number // JWT issue timestamp
  exp: number // JWT expiration timestamp
  userData: IUser
}
