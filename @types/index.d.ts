import * as express from 'express'

import { IUserSession } from '../src/types/user'

declare global {
  namespace Express {
    interface Request {
      userData?: IUserSession
    }
  }
}

export interface UserPayload {
  iat: number // JWT issue timestamp
  exp: number // JWT expiration timestamp
  userData: IUserSession
}
