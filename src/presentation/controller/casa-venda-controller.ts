import { FileStorage } from '../../domain/usecases/file-storage';
import { HttpRequest, HttpResponse } from '../protocols/http'
import { ErroValidacao } from '../errors/erro-validacao'
import { CadastroCasaVendaRepositorio } from '../../data/usecases/cadastro-imovel/casa-venda-repositorio'
import { Controller } from '../protocols/controller'

export class CasaVendaController implements Controller {


  constructor(private readonly casaVendaRepositorio: CadastroCasaVendaRepositorio, private readonly fileStorage: FileStorage) {

  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.dormitorios) {
      return {
        statusCode: 400,
        body: new ErroValidacao('dormitórios')
      }
    }
    if (!httpRequest.body.suites) {
      return {
        statusCode: 400,
        body: new ErroValidacao('suites')
      }
    }
    if (!httpRequest.body.banheiros) {
      return {
        statusCode: 400,
        body: new ErroValidacao('banheiros')
      }
    }
    if (!httpRequest.body.vagaGaragem) {
      return {
        statusCode: 400,
        body: new ErroValidacao('vagaGaragem')
      }
    }
    if (!httpRequest.body.areaTerreno) {
      return {
        statusCode: 400,
        body: new ErroValidacao('areaTerreno')
      }
    }
    if (!httpRequest.body.areaConstruida) {
      return {
        statusCode: 400,
        body: new ErroValidacao('areaConstruida')
      }
    }

    let body = httpRequest.body;
    body.idAnunciante = httpRequest.idAnunciante





    const dir = await this.fileStorage.upload(httpRequest?.locals?.buffer, '1')

    body.dir = dir;

    const resultado = await this.casaVendaRepositorio.post(httpRequest.body)


    return {

      statusCode: 200,
      body: resultado
    }
  }





}
