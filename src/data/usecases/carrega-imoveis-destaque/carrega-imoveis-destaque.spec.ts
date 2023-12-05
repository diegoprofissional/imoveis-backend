import { CarregaImoveisDestaque } from './carrega-imoveis-destaque';
import { ImovelResidencial } from './../../../infra/db/postgres/models/ImovelResidencial';
import { Imovel } from './../../../infra/db/postgres/models/Imovel';
import { CarregaImoveisDestaqueRepositorio } from './../../protocols/carrega-imoveis-destaque-repositorio';


type tipos = {
  target: CarregaImoveisDestaque,
  carregaImoveisDestaqueRepositorioStub: CarregaImoveisDestaqueRepositorio
}

const mockCarregaImoveisDestaqueRepositorio = (): CarregaImoveisDestaqueRepositorio => {
  class CarregaImoveisDestaqueRepositorioStub implements CarregaImoveisDestaqueRepositorio {
    async carregar(): Promise<ImovelResidencial[]> {
      return new Promise(resolve => resolve(obterMockImoveisDestaque()))
    }
  }

  return new CarregaImoveisDestaqueRepositorioStub()

}

const targetFactory = (): tipos => {

  const carregaImoveisDestaqueRepositorioStub = mockCarregaImoveisDestaqueRepositorio()

  const target = new CarregaImoveisDestaque(carregaImoveisDestaqueRepositorioStub)
  return {
    target,
    carregaImoveisDestaqueRepositorioStub
  }
}

const obterMockImoveisDestaque = (): ImovelResidencial[] => {

  return [
    { id: 1, dormitorios: 3, suites: 2, banheiros: 1, capacidadeGaragem: 1, iptu: 120, preco: 120000, tipoImovel: 'casa', descricao: 'Encantadora casa de 3 dormitórios, localizada em bairro tranquilo e arborizado. Espaços amplos, cozinha moderna, quintal espaçoso e acabamentos elegantes. Ideal para quem busca conforto e estilo em um lar aconchegante.' },
    { id: 2, dormitorios: 3, suites: 2, banheiros: 1, capacidadeGaragem: 1, iptu: 120, preco: 120000, tipoImovel: 'casa', descricao: 'Encantadora casa de 3 dormitórios, localizada em bairro tranquilo e arborizado. Espaços amplos, cozinha moderna, quintal espaçoso e acabamentos elegantes. Ideal para quem busca conforto e estilo em um lar aconchegante.' },
  ]

}


describe('CarregaImoveisDestaque', () => {
  test('Deve chamar CarregaImoveisDestaque', async () => {

    const { target, carregaImoveisDestaqueRepositorioStub } = targetFactory()

    const carregaSpy = jest.spyOn(carregaImoveisDestaqueRepositorioStub, 'carregar')


    await target.carregar()

    expect(carregaSpy).toHaveBeenCalled()

  })

  test('Deve chamar CarregaImoveisDestaque', async () => {

    const { target, carregaImoveisDestaqueRepositorioStub } = targetFactory()

    const carregaSpy = jest.spyOn(carregaImoveisDestaqueRepositorioStub, 'carregar')


    const imoveis = await target.carregar()

    expect(imoveis).toEqual(obterMockImoveisDestaque())

  })


  test('Deve lançar exceção se o repositório lançar uma exceção', async () => {

    const { target, carregaImoveisDestaqueRepositorioStub } = targetFactory()


    const mockedReaddirSync = jest.spyOn(carregaImoveisDestaqueRepositorioStub, 'carregar');
    mockedReaddirSync.mockImplementationOnce(() => {
      throw new Error('');
    });

    const promise = target.carregar()

    expect(promise).rejects.toThrow()

  })


})