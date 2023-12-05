import { makeFakeDb } from '../mocks/make-fake-db'
import { CorretorModel } from '../models/corretor-model'
import { CorretorRepository } from './registro-repositorio'
import { Repository, getConnection, getRepository } from 'typeorm'

describe('RegistroRepositorio', () => {
  let sut: CorretorRepository
  let backup
  let corretorRepository: Repository<CorretorModel>
  beforeAll(async () => {
    const db = await makeFakeDb()
    backup = db.backup()
    corretorRepository = getRepository(CorretorModel)
  })

  beforeEach(() => {
    backup.restore()
    sut = new CorretorRepository()
  })

  afterAll(async () => {
    await getConnection().close()
  })

  describe('obterPorEmail', () => {
    test('Deve retornar os dados do corretor se o e-mail existir', async () => {
      await corretorRepository.save(
        {
          primeiroNome: 'qualquer_nome',
          sobrenome: 'qualquer_sobrenome',
          creci: 'qualquer_creci',
          celular: 'qualquer_celular',
          email: 'qualquer_email@email.com',
          senha: 'qualquer_senha'
        }
      )

      const corretor = await sut.obterPorEmail('qualquer_email@email.com')

      expect(corretor).toEqual({
        id: 1,
        primeiroNome: 'qualquer_nome',
        sobrenome: 'qualquer_sobrenome',
        creci: 'qualquer_creci',
        celular: 'qualquer_celular',
        email: 'qualquer_email@email.com',
        senha: 'qualquer_senha'
      })
    })

    test('Deve retornar undefined se o e-mail não existir', async () => {
      const corretor = await sut.obterPorEmail('qualquer_email@email.com')

      expect(corretor).toBeUndefined()
    })
  })

  describe('adicionarCorretor', () => {
    test('Deve adicionar corretor se não houver erro de sistema', async () => {
      await sut.adicionar({
        primeiroNome: 'qualquer_nome',
        sobrenome: 'qualquer_sobrenome',
        creci: 'qualquer_creci',
        celular: 'qualquer_celular',
        email: 'qualquer_email@email.com',
        senha: 'qualquer_senha'
      })

      const corretorDB = await corretorRepository.find()

      expect(corretorDB.length).toBe(1)
      expect(corretorDB[0]).toEqual({
        id: 1,
        primeiroNome: 'qualquer_nome',
        sobrenome: 'qualquer_sobrenome',
        creci: 'qualquer_creci',
        celular: 'qualquer_celular',
        email: 'qualquer_email@email.com',
        senha: 'qualquer_senha'
      })
    })

    test('Deve atualizar os dados do corretor se não houver erro de sistema', async () => {
      await sut.adicionar({
        primeiroNome: 'qualquer_nome',
        sobrenome: 'qualquer_sobrenome',
        creci: 'qualquer_creci',
        celular: 'qualquer_celular',
        email: 'qualquer_email@email.com',
        senha: 'qualquer_senha'
      })

      const corretorDB = await corretorRepository.find()

      expect(corretorDB.length).toBe(1)
      expect(corretorDB[0]).toEqual({
        id: 1,
        primeiroNome: 'qualquer_nome',
        sobrenome: 'qualquer_sobrenome',
        creci: 'qualquer_creci',
        celular: 'qualquer_celular',
        email: 'qualquer_email@email.com',

        senha: 'qualquer_senha'
      })
    })
  })
})
