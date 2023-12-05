import { mock } from 'jest-mock-extended';
import { ObterCasaVendaPorIdRepositorio } from '../../data/usecases/cadastro-imovel/obter-casa-venda-por-id-repositorio';
import { Casa } from '../../domain/models/casa';
import { HttpRequest } from '../protocols';
import { CasaVendaPorIdController } from './casa-venda-por-id-Controller';
import { rejects } from 'assert';

const httpRequestMock: HttpRequest = {
  params: { id: 1 }
}

class ObterCasaVendaPorIdRepositorioStub implements ObterCasaVendaPorIdRepositorio {

  async obterCasaVendaPorId(id: number): Promise<Casa | undefined> {

    return {
      suites: 2,
      banheiros: 1,
      idAnunciante: 1,
      idEndereco: 1,
      dir: '2',
      dormitorios: 3,
      capacidadeGaragem: 1,
      areaTerreno: 100,
      areaConstruida: 90,
      preco: 188000,
      iptu: 90
    }
  }

}

const obterCasaVendaPorIdRepositorioStub = new ObterCasaVendaPorIdRepositorioStub()

const targetFactory = (): CasaVendaPorIdController => {


  return new CasaVendaPorIdController(obterCasaVendaPorIdRepositorioStub)
}


describe('CasaVendaPorIdController', () => {

  test('Deve chamar ObterCasaVendaPorIdRepositorio com os parâmetros corretos.', () => {

    const target = targetFactory();

    const spyObterCasaVendaPorId = jest.spyOn(obterCasaVendaPorIdRepositorioStub, 'obterCasaVendaPorId')

    target.handle(httpRequestMock)

    expect(spyObterCasaVendaPorId).toHaveBeenCalledWith(httpRequestMock.params.id)

  })

  test('Deve retornar erro 500 se ObterCasaVendaPorIdRepositorio lançar.', async () => {

    const target = targetFactory();

    const spyObterCasaVendaPorId = jest.spyOn(obterCasaVendaPorIdRepositorioStub, 'obterCasaVendaPorId').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error())
      ))

    const result = await target.handle(httpRequestMock)

    expect(result.statusCode).toBe(500)

  })



})