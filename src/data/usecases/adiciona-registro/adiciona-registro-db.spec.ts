import { Encrypter } from './../../protocols/Encrypter';
import { AdicionarRegistroRepositorio } from './../../protocols/adicionar-registro-repositorio'
import { Corretor } from './../../../domain/models/corretor'
import { AdicionaRegistroDB } from './adiciona-registro-db'
import { AdicionaRegistroModel } from '../../../domain/usecases/adicionaRegistro'
import { Hasher } from '../../protocols/hasher';

interface SutTypes {
  sut: AdicionaRegistroDB
  encrypterStub: Hasher
  adicionarRegistroRepositorioStub: AdicionarRegistroRepositorio
}

const makeEncrypter = (): Hasher => {
  class EncrypterStub {
    async hash(value: string): Promise<string> {
      return new Promise(resolve => resolve('hash'))
    }
  }

  return new EncrypterStub()
}

const makeAdicionaRegistroRepositorio = (): AdicionarRegistroRepositorio => {
  class AdicionaRegistroRepositorioStub implements AdicionarRegistroRepositorio {
    async adicionar(corretor: AdicionaRegistroModel): Promise<Corretor> {
      const corretorFake = {
        id: 1,
        primeiroNome: 'nome_valido',
        sobrenome: 'sobrenome_valido',
        creci: 'creci_valido',
        celular: 'celular_valido',
        email: 'email_valido@email.com',
        senha: 'senha_valida'
      }

      return new Promise(resolve => resolve(corretorFake))
    }
  }

  return new AdicionaRegistroRepositorioStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const adicionarRegistroRepositorioStub = makeAdicionaRegistroRepositorio()
  const sut = new AdicionaRegistroDB(encrypterStub, adicionarRegistroRepositorioStub)

  return {
    sut,
    encrypterStub,
    adicionarRegistroRepositorioStub

  }
}

describe('AdicionaRegistroDB Usecase', () => {
  test('tesfdsfd', async () => {
    const { encrypterStub, sut } = makeSut()

    const encryptSpy = jest.spyOn(encrypterStub, 'hash')

    const dadosRegistro = {
      id: 1,
      primeiroNome: 'nome_valido',
      sobrenome: 'sobrenome_valido',
      creci: 'creci_valido',
      celular: 'celular_valido',
      email: 'email_valido@email.com',
      senha: 'senha_valida'
    }

    await sut.adicionar(dadosRegistro)
    expect(encryptSpy).toHaveBeenCalledWith('senha_valida')
  })

  test('', async () => {
    const { encrypterStub, sut } = makeSut()

    jest.spyOn(encrypterStub, 'hash').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error())
      ))

    const dadosRegistro = {
      id: 'valid_id',
      primeiroNome: 'qualquer_nome',
      sobrenome: 'qualquer_sobrenome',
      creci: 'qualquer_creci',
      celular: 'qualquer_celular',
      email: 'qualquer_email@email.com',
      senha: 'qualquer_senha'
    }

    const promise = sut.adicionar(dadosRegistro)
    await expect(promise).rejects.toThrow()
  })

  test('Deve chamar AdicionaRegistroRepositorio com os parametros corretos', async () => {
    const { sut, adicionarRegistroRepositorioStub } = makeSut()

    const adicionarSpy = jest.spyOn(adicionarRegistroRepositorioStub, 'adicionar')

    const dadosRegistro = {
      primeiroNome: 'nome_valido',
      sobrenome: 'sobrenome_valido',
      creci: 'creci_valido',
      celular: 'celular_valido',
      email: 'email_valido@email.com',
      senha: 'senha_valida'
    }

    await sut.adicionar(dadosRegistro)
    expect(adicionarSpy).toHaveBeenCalledWith({
      primeiroNome: 'nome_valido',
      sobrenome: 'sobrenome_valido',
      creci: 'creci_valido',
      celular: 'celular_valido',
      email: 'email_valido@email.com',
      senha: 'hash'
    })
  })
})
