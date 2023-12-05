import { EnderecoService } from "../../data/usecases/endereco-service";
import { ErroServidor } from "../errors";
import { HttpRequest, HttpResponse } from "../protocols";
import { Controller } from "../protocols/controller";

export class EnderecoAutocompleteController implements Controller {

  constructor(private readonly enderecoService: EnderecoService) {

  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

    try {



      const endereco = httpRequest.query.endereco


      if (endereco.length < 3) {
        return {
          statusCode: 400,
          body: {}
        }
      }

      const resultado = await this.enderecoService.buscar(endereco)

      return {
        statusCode: 200,
        body: resultado
      }

    } catch (error) {

      return {
        statusCode: 500,
        body: new ErroServidor(error)
      }

    }
  }

}