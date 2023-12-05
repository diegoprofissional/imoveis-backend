import { NextFunction, Request, Response } from 'express'
import { HttpRequest } from '../../presentation/protocols'
import { Middleware } from '../../presentation/protocols/middleware'

export const adaptMiddleware = (middlware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      headers: req.headers,
      idAnunciante: req.idAnunciante
    }
    const httpResponse = await middlware.handle(httpRequest)

    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body)
      next()
    } else {
      res.status(httpResponse.statusCode).json(httpResponse.body)

    }

  }
}
