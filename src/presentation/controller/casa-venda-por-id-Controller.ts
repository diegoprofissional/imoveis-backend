import { FileStorage } from './../../domain/usecases/file-storage';
import { HttpRequest, HttpResponse } from '../protocols/http'
import { ErroValidacao } from '../errors/erro-validacao'
import { CadastroCasaVendaRepositorio } from '../../data/usecases/cadastro-imovel/casa-venda-repositorio'
import { Controller } from '../protocols/controller'
import { ObterCasaVendaPorIdRepositorio } from '../../data/usecases/cadastro-imovel/obter-casa-venda-por-id-repositorio';

export class CasaVendaPorIdController implements Controller {


  constructor(private readonly obterCasaVendaPorIdRepositorio: ObterCasaVendaPorIdRepositorio) {

  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

    try {

      const resultado = await this.obterCasaVendaPorIdRepositorio.obterCasaVendaPorId(httpRequest.params.id)

      return {

        statusCode: 200,
        body: resultado
      }
    }
    catch (error) {
      return {
        statusCode: 500,
        body: error
      }


    }

  }
}
