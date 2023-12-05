import { Controller } from './../../protocols/controller';
import { resolve } from 'path';
import { HttpRequest, HttpResponse } from './../../protocols/http';
import { ErroValidacao } from '../../errors';
import { PesquisaImoveis } from '../../../domain/usecases/pesquisaImoveis';
import { PesquisaImoveisResidenciais } from "../../../data/protocols/pesquisa-imoveis-residenciais";
import { PesquisaImoveisResidenciaisContador } from '../../../data/protocols/pesquisa-imoveis-residenciais-contador';
import { HttpResponse400 } from '../../models/HttpResponse400';

export class PesquisaImoveisResidenciaisContadorController implements Controller {

  constructor(private readonly pesquisaImoveisResidenciaisContador: PesquisaImoveisResidenciaisContador) {

  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

    const { piscina, dormitorios, endereco, tipoEndereco } = httpRequest?.query || {}


    if (!endereco) {

      const httpResponse400: HttpResponse400 = {
        codigo: "campo_obrigatorio",
        mensagem: "Para realizar a pesquisa o campo endereço é obrigatório."
      }

      return {
        statusCode: 400,
        body: httpResponse400
      }
    }

    if (!tipoEndereco) {

      const httpResponse400: HttpResponse400 = {
        codigo: "campo_obrigatorio",
        mensagem: "Para realizar a pesquisa o campo tipo de endereço é obrigatório."
      }

      return {
        statusCode: 400,
        body: httpResponse400
      }
    }


    if (piscina) {

      const httpResponse400: HttpResponse400 = {
        codigo: "valor_invalido",
        mensagem: "Valor invalido para a opção psicina."
      }

      if (!(piscina === 'true' || piscina === 'false')) {
        return {
          statusCode: 400,
          body: httpResponse400
        }
      }

    }

    if (dormitorios) {

      if (!(dormitorios >= 0 && dormitorios <= 99)) {

        return {
          statusCode: 400,
          body: new ErroValidacao('dormitorios')
        }

      }

    }

    const resultado = await this.pesquisaImoveisResidenciaisContador.pesquisarImoveisResidenciaisContador({ query: httpRequest?.query })

    return {
      statusCode: 200,
      body: resultado
    }


  }

}