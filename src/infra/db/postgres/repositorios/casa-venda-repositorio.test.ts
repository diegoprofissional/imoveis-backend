import { DiretorioAdapter } from './../../../../main/adapters/diretorio-adapter';
import { EnderecoRepositorio } from './endereco-respositorio';
import { CadastroEnderecoRepositorio } from './../../../../data/usecases/endereco-repositorio';
import { GoogleApiAdapter } from './../../../apis-externas/google-api-adapter';
import { CasaVendaRepositorio } from './casa-venda-repositorio';
import { CasaVendaModel, CorretorModel, EnderecoModel } from '../models';
import { Repository, getConnection, getRepository } from 'typeorm';
import { makeFakeDb } from '../mocks/make-fake-db';


let casaVendaDB: CasaVendaModel
let casaVendaDBDirInvalido: CasaVendaModel

const targetFactory = (): CasaVendaRepositorio => {

  const enderecoRepositorio = new EnderecoRepositorio()


  const diretorioAdapter = new DiretorioAdapter()

  return new CasaVendaRepositorio(enderecoRepositorio, diretorioAdapter)

}


describe('CasaVendaRepositorio', () => {

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

  describe('obterCasaVendaPorId', () => {

    test('Deve retornar dados se o id existe', async () => {

      const target = targetFactory()


      const resultado = await target.obterCasaVendaPorId(casaVendaDB.id);


      expect(resultado?.id).toBe(1)

    })

    /*   test('Deve retornar erro se AcessaDiretorio lançar exceção', async () => {
  
        const target = targetFactory()
  
  
        const resultado = await target.obterCasaVendaPorId(casaVendaDBDirInvalido.id);
  
        console.log("resulttttt")
        console.log(resultado)
  
        expect(resultado?.id).toBe(1)
  
  
      }) */

  })
})