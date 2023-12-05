import { ImageUploadAdapter } from './../../main/adapters/image-upload-adapter';
import { CasaVendaController } from './casa-venda-controller';
import { DiretorioAdapter } from './../../main/adapters/diretorio-adapter';
import { EnderecoRepositorio } from './../../infra/db/postgres/repositorios/endereco-respositorio';
import { CasaVendaRepositorio } from '../../infra/db/postgres/repositorios/casa-venda-repositorio';
import { ErroValidacao } from '../errors/erro-validacao'



const makeSut = (): CasaVendaController => {

  const enderecoRepositorio = new EnderecoRepositorio()

  const diretorioAdapter = new DiretorioAdapter()

  const casaVendaRepositorioStub = new CasaVendaRepositorio(enderecoRepositorio, diretorioAdapter)



  const imageUploadAdapter = new ImageUploadAdapter(diretorioAdapter)


  return new CasaVendaController(casaVendaRepositorioStub, imageUploadAdapter)
}

describe.skip('CasaVendaController', () => {
  test('Verifica se o campo dormitórios está ausente ao adicionar uma casa para venda', async () => {
    const sut = makeSut()

    const httpRequest = {
      body: { // dormitorios: 3,
        suites: 2,
        banheiros: 1,
        vagaGaragem: 1,
        areaTerreno: 100,
        areaConstruida: 90,
        preco: 188000,
        iptu: 90
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new ErroValidacao('dormitórios'))
  })
})

describe('CasaVendaController', () => {
  test('Verifica se o campo suites está ausente ao adicionar uma casa para venda', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        dormitorios: 3,
        banheiros: 1,
        vagaGaragem: 1,
        areaTerreno: 100,
        areaConstruida: 90,
        preco: 188000,
        iptu: 90
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new ErroValidacao('suites'))
  })
})

describe('CasaVendaController', () => {
  test('Verifica se o campo banheiros está ausente ao adicionar uma casa para venda', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        dormitorios: 3,
        suites: 2,
        vagaGaragem: 1,
        areaTerreno: 100,
        areaConstruida: 90,
        preco: 188000,
        iptu: 90
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new ErroValidacao('banheiros'))
  })
})

describe('CasaVendaController', () => {
  test('Verifica se o campo vagaGaragem está ausente ao adicionar uma casa para venda', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        dormitorios: 3,
        suites: 2,
        banheiros: 1,
        areaTerreno: 100,
        areaConstruida: 90,
        preco: 188000,
        iptu: 90
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new ErroValidacao('vagaGaragem'))
  })
})

describe('CasaVendaController', () => {
  test('Verifica se o campo areaTerreno está ausente ao adicionar uma casa para venda', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        dormitorios: 3,
        suites: 2,
        banheiros: 1,
        areaConstruida: 90,
        vagaGaragem: 1,
        preco: 188000,
        iptu: 90
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new ErroValidacao('areaTerreno'))
  })
})

describe('CasaVendaController', () => {
  test('Verifica se o campo areaConstruida está ausente ao adicionar uma casa para venda', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        dormitorios: 3,
        suites: 2,
        banheiros: 1,
        areaTerreno: 100,
        vagaGaragem: 1,
        preco: 188000,
        iptu: 90
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new ErroValidacao('areaConstruida'))
  })
})
