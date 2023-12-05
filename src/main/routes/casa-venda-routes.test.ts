import { CasaVendaModel } from '../../infra/db/postgres/models/casa-venda-model';
import { Casa } from '../../domain/models/casa';
import app from '../config/app'
import request from 'supertest'
import { CasaVendaRepositorio } from '../../infra/db/postgres/repositorios/casa-venda-repositorio';
import { Repository, getConnection, getRepository } from 'typeorm';
import { makeFakeDb } from '../../infra/db/postgres/mocks/make-fake-db';
import { CorretorModel, EnderecoModel } from '../../infra/db/postgres/models';
import { EnderecoRepositorio } from '../../infra/db/postgres/repositorios/endereco-respositorio';
import { DiretorioAdapter } from '../adapters/diretorio-adapter';


let casaVendaDB: CasaVendaModel
let casaVendaDBDirInvalido: CasaVendaModel


const targetFactory = (): CasaVendaRepositorio => {

  const enderecoRepositorio = new EnderecoRepositorio()


  const diretorioAdapter = new DiretorioAdapter()

  return new CasaVendaRepositorio(enderecoRepositorio, diretorioAdapter)

}

describe('POST  /casas-venda', () => {


  let target: CasaVendaRepositorio
  let backup
  let casaVendaRepository: Repository<CasaVendaModel>
  beforeAll(async () => {
    const db = await makeFakeDb()

    casaVendaRepository = getRepository(CasaVendaModel)


    const corretorDB = await getRepository(CorretorModel).save({
      primeiroNome: 'nome_valido',
      sobrenome: 'sobrenome_valido',
      creci: 'creci_valido',
      celular: 'celular_valido',
      email: 'email_valido@email.com',
      senha: 'senha_valida'
    })


    const enderecoDB = await getRepository(EnderecoModel).save({
      logradouro: "Rua Alegria",
      bairro: "Centro",
      cidade: "Franca",
      estado: "São Paulo",
      pais: "Brasil",
      cep: '11111-111'
    })

    casaVendaDB = await casaVendaRepository.save({
      idAnunciante: corretorDB.id,
      dormitorios: 1,
      suites: 2,
      banheiros: 1,
      capacidadeGaragem: 1,
      areaTerreno: 100,
      areaConstruida: 90,
      descricao: 'descrição fictícia',
      dir: '1',
      preco: 188000,
      idEndereco: enderecoDB.id,
      iptu: 90
    })

    const enderecoDBDirInvalido = await getRepository(EnderecoModel).save({
      logradouro: "Rua Alegria",
      bairro: "Centro",
      cidade: "Franca",
      estado: "São Paulo",
      pais: "Brasil",
      cep: '11111-111'
    })

    casaVendaDBDirInvalido = await casaVendaRepository.save({
      idAnunciante: corretorDB.id,
      dormitorios: 1,
      suites: 2,
      banheiros: 1,
      capacidadeGaragem: 1,
      areaTerreno: 100,
      areaConstruida: 90,
      descricao: 'descrição fictícia',
      dir: '1',
      preco: 188000,
      idEndereco: enderecoDBDirInvalido.id,
      iptu: 90
    })

    backup = db.backup()

  })

  afterEach(() => {

  })

  beforeEach(() => {
    backup.restore()
    target = targetFactory()
  })

  afterAll(async () => {
    await getConnection().close()
  })


  test.skip('Deve retornar 403 se o token de acesso não está presente', async () => {

    const casa: Casa = {
      idAnunciante: 1,
      idEndereco: 1,
      dormitorios: 3,
      banheiros: 2,
      suites: 1,
      areaConstruida: 100,
      areaTerreno: 120,
      preco: 120000,
      iptu: 200,
      capacidadeGaragem: 1,
      dir: '1'

    }

    await request(app).post('/casas-venda').send(casa).expect(403)

  })
})