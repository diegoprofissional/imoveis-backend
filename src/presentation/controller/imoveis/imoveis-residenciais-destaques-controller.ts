import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { ErroValidacao } from '../../errors';
import { PesquisaImoveis } from '../../../domain/usecases/pesquisaImoveis';
import { CarregaImoveisResidenciaisDestaque } from '../../../data/protocols/carrega-imoveis-residenciais-destaque';
export class ImoveisResidenciaisDestaquesController implements Controller {

  constructor(private readonly carregaImoveisResidenciaisDestaque: CarregaImoveisResidenciaisDestaque) {

  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

    const imoveisDestaque = await this.carregaImoveisResidenciaisDestaque.carregarImoveisResidenciaisDestaque()

    return {
      statusCode: 200,
      body: imoveisDestaque
    }


  }

}