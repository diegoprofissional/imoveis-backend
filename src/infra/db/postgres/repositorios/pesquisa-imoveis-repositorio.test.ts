/* import { DiretorioAdapter } from './../../../../main/adapters/diretorio-adapter';
import { CorretorModel } from './../models/corretor-model';
import { Repository, getConnection, getRepository } from 'typeorm';
import { EnumeraDiretorioFotos } from '../../../../data/protocols/enumera-diretorio-fotos';
import { ObtemFotosImoveis } from '../../../../data/protocols/obtem-fotos-imoveis';
import { CasaVendaModel, EnderecoModel } from '../models';
import { PesquisaImoveisRepositorio } from './pesquisa-imoveis-repositorio';
import { makeFakeDb } from '../mocks/make-fake-db';

let casaVendaDB: CasaVendaModel
let casaVendaDBDirInvalido: CasaVendaModel



const targetFactory = (): PesquisaImoveisRepositorio => {

  const diretorioAdapter = new DiretorioAdapter()



  return new PesquisaImoveisRepositorio(diretorioAdapter)
}


describe('CasaVendaRepositorio', () => {

  let target: PesquisaImoveisRepositorio
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



    for (let i = 0; i < 20; i++) {

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
        dir: i.toString(),
        preco: 188000,
        idEndereco: enderecoDB.id,
        iptu: 90
      })

    }


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


      const resultado = await target.carregarImoveisResidenciaisDestaque();


      expect(1).toBe(1)

    })

    test('Deve retornar erro se AcessaDiretorio lançar exceção', async () => {

      const target = targetFactory()


      const resultado = await target.obterCasaVendaPorId(casaVendaDBDirInvalido.id);

      console.log("resulttttt")
      console.log(resultado)

      expect(resultado?.id).toBe(1)


    })

  })
}) */