import { Authentication } from './../../../domain/usecases/authentication'
import { HttpResponse } from './../../protocols/http'
import { HttpRequest } from '../../protocols'
import { ErroValidacao } from '../../errors'
import { Controller } from '../../protocols/controller'

export class LoginController implements Controller {
  private readonly authentication: Authentication
  constructor(authentication: Authentication) {
    this.authentication = authentication
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.usuario) {
      return {
        statusCode: 400,
        body: new ErroValidacao('email')
      }
    }

    if (!httpRequest.body.senha) {
      return {
        statusCode: 400,
        body: new ErroValidacao('senha')
      }
    }

    const resultado = await this.authentication.auth(httpRequest.body.usuario, httpRequest.body.senha)

    if (resultado === undefined) {
      return {
        statusCode: 401,
        body: new ErroValidacao('senha')
      }
    }

    return {
      statusCode: 200,
      body: resultado
    }
  }
}
