import { HttpResponse403 } from './../../../presentation/models/HttpResponse403';
import { HttpRequest, HttpResponse } from './../../../presentation/protocols/http';
import { Middleware } from "../../../presentation/protocols/middleware";
import { ErroPermissao } from '../../../presentation/errors/erro-permissao';
import { Decrypter } from '../../../data/protocols/Decrypter';

export class AuthMiddleware implements Middleware {

  constructor(private readonly decrypter: Decrypter) {

  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

    try {
      const tokenAcesso = httpRequest.headers?.['x-access-token']

      if (tokenAcesso) {
        const token = await this.decrypter.decrypt(tokenAcesso)




        return {

          statusCode: 200,
          body: { idAnunciante: token?.payload?.id },

        }

      }

      const httpResponse403: HttpResponse403 = {
        codigo: "acesso_negado",
        mensagem: "token de acesso inválido"
      }


      const httpResponse: HttpResponse = {
        statusCode: 403,
        body: httpResponse403
      }

      return new Promise(resolve => resolve(httpResponse))

    } catch (error) {
      return {
        statusCode: 500,
        body: new Error('erro servidor')
      }
    }
  }
}