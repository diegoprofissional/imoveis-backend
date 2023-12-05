import { PesquisaImoveisResidenciaisContadorController } from './pesquisa-imoveis-residenciais-contador-controller';
import { ImovelResidencial } from './../../../infra/db/postgres/models/ImovelResidencial';
import { PesquisaImoveis } from './../../../domain/usecases/pesquisaImoveis';
import { Imovel } from './../../../infra/db/postgres/models/Imovel';
import { HttpRequest } from "../../protocols";
import { PesquisaImoveisResidenciaisController } from "./pesquisa-imoveis-residenciais-controller";
import { PesquisaImoveisResidenciais } from "../../../data/protocols/pesquisa-imoveis-residenciais";
import { PesquisaImoveisResidenciaisContador } from '../../../data/protocols/pesquisa-imoveis-residenciais-contador';

export class ImoveisResidenciaisRepositorioStub implements PesquisaImoveisResidenciaisContador {

  pesquisarImoveisResidenciaisContador(param: any): Promise<any> {


    return new Promise(resolve => resolve({
      "resultado": [
        {}
      ],
      "total_geral": 0
    }))

  }
}

const targetFactory = (): PesquisaImoveisResidenciaisContadorController => {

  const target = new PesquisaImoveisResidenciaisContadorController(imoveisResidenciaisRepositorioStub)

  return target

}

const imoveisResidenciaisRepositorioStub = new ImoveisResidenciaisRepositorioStub()


const httpRequestMock: HttpRequest = {
  query: {
    tipoEndereco: 'qualquer_tipo',
    endereco: 'qualquer_endereco'
  }
}


describe('PesquisaImoveisResidenciaisContadorController', () => {

  test('Deve retornar status code 400 se endereço estiver ausente', async () => {

    const target = targetFactory()

    const httpRequest: HttpRequest = {
      query: { tipoEndereco: 'qualquer_tipo' }
    }

    const resultado = await target.handle(httpRequest);
    expect(resultado.statusCode).toBe(400)
    expect(resultado.body.mensagem).toBe('Para realizar a pesquisa o campo endereço é obrigatório.')
  })

  test('Deve retornar status code 400 se tipo endereço estiver ausente', async () => {

    const target = targetFactory()

    const httpRequest: HttpRequest = {
      query: { endereco: 'qualquer_endereco' }
    }

    const resultado = await target.handle(httpRequest);
    expect(resultado.statusCode).toBe(400)
    expect(resultado.body.mensagem).toBe('Para realizar a pesquisa o campo tipo de endereço é obrigatório.')
  })


  test('Deve retornar status code 200 se o parâmetro piscina está presente e for Boolean', async () => {

    const target = targetFactory()

    const httpRequestMock: HttpRequest = {
      query: {
        tipoEndereco: 'qualquer_tipo',
        endereco: 'qualquer_endereco',
        piscina: 'true'
      }
    }

    const resultado = await target.handle(httpRequestMock);
    expect(resultado.statusCode).toBe(200)
  })

  test('Deve retornar status code 400 se o parâmetro piscina está presente e não for Boolean', async () => {

    const target = targetFactory()

    const httpRequestMock: HttpRequest = {
      query: {
        tipoEndereco: 'qualquer_tipo',
        endereco: 'qualquer_endereco',
        piscina: 'valor_invalido'
      }
    }

    const resultado = await target.handle(httpRequestMock);
    expect(resultado.statusCode).toBe(400)

    expect(resultado.body.mensagem).toBe('Valor invalido para a opção psicina.')
  })

  test('Deve retornar status code 200 se o parâmetro dormitorios está presente e numerico', async () => {

    const target = targetFactory()

    const httpRequestMock: HttpRequest = {
      query: {
        tipoEndereco: 'qualquer_tipo',
        endereco: 'qualquer_endereco',
        dormitorios: 30
      }
    }

    const resultado = await target.handle(httpRequestMock);


    expect(resultado.statusCode).toBe(200)
  })

  test('Deve passar os parâmetros corretos para ImoveisResidenciaisRepositorio ', async () => {

    const spyPesquisarImoveisResidenciais = jest.spyOn(imoveisResidenciaisRepositorioStub, 'pesquisarImoveisResidenciaisContador');

    const target = targetFactory()

    const httpRequestMock: HttpRequest = {
      query: {
        tipoEndereco: 'qualquer_tipo',
        endereco: 'qualquer_endereco',
        piscina: 'true'
      }
    }

    const resultado = await target.handle(httpRequestMock);
    expect(spyPesquisarImoveisResidenciais).toHaveBeenCalledWith(httpRequestMock)
    expect(spyPesquisarImoveisResidenciais).toHaveBeenCalledTimes(1)

  })


})  