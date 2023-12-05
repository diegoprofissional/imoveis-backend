import { Request, Response } from 'express'
import { HttpRequest } from '../../presentation/protocols'
import { Controller } from '../../presentation/protocols/controller'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {



    const httpRequest: HttpRequest = {
      body: req.body,
      query: req?.query,
      params: req.params,
      idAnunciante: req?.idAnunciante,
      locals: req?.locals
    }
    const httpResponse = await controller.handle(httpRequest)

    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
