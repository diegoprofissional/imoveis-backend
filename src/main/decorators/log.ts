import { HttpRequest, HttpResponse } from '../../presentation/protocols'
import { Controller } from './../../presentation/protocols/controller'
export class LogControllerDecorator implements Controller {
  private readonly controller: Controller

  constructor(controller: Controller) {
    this.controller = controller
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      // logger
    }
    return httpResponse
  }
}
