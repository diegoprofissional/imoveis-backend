import { AdicionaRegistro, AdicionaRegistroModel } from '../../../domain/usecases/adicionaRegistro'
import { ValidadorEmail } from '../../protocols/validador-email'
import { RegistroController } from './registro-controller'
import { ErroServidor, ErroValidacao } from '../../errors'

interface SutTypes {
  sut: RegistroController
  validadorEmailStub: ValidadorEmail
  adicionaRegistroStub: AdicionaRegistro
}

const makeSut = (): SutTypes => {
  class ValidadorEmailStub implements ValidadorEmail {
    estaValido(email: string): boolean {
      return true
    }
  }
  const validadorEmailStub = new ValidadorEmailStub()
  const adicionaRegistroStub = makeAdicionaRegistro()
  const sut = new RegistroController(validadorEmailStub, adicionaRegistroStub)
  return {
    sut,
    validadorEmailStub,
    adicionaRegistroStub
  }
}

const makeAdicionaRegistro = (): AdicionaRegistro => {
  class AdicionaRegistroStub implements AdicionaRegistro {
    async adicionar(registro: AdicionaRegistroModel): Promise<AdicionaRegistro.Resultado> {
      const registroFake = {
        id: 1,
        primeiroNome: 'qualquer_nome',
        sobrenome: 'qualquer_sobrenome',
        creci: 'qualquer_creci',
        celular: 'qualquer_celular',
        email: 'qualquer_email@email.com',
        senha: 'qualquer_senha'
      }
      return new Promise(resolve => resolve(registroFake))
    }
  }
  return new AdicionaRegistroStub()
}

describe('SignUp Controller', () => {
  test('Verifica se o campo nome está ausente ao registrar um corretor', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        sobrenome: 'qualquer_sobrenome',
        creci: 'qualquer_creci',
        celular: 'qualquer_celular',
        email: 'qualquer_email@email.com',
        confirmacaoEMail: 'qualquer_email@email.com',
        senha: 'qualquer_senha'

      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new ErroValidacao('informação obrigatória: primeiroNome'))
  })

  test('Verifica se o campo sobrenome está ausente ao registrar um corretor', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        primeiroNome: 'qualquer_nome',
        creci: 'qualquer_creci',
        celular: 'qualquer_celular',
        email: 'qualquer_email@email.com',
        confirmacaoEMail: 'qualquer_email@email.com',
        senha: 'qualquer_senha'

      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new ErroValidacao('informação obrigatória: sobrenome'))
  })

  test('Verifica se o campo creci está ausente ao registrar um corretor', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        primeiroNome: 'qualquer_nome',
        sobrenome: 'qualquer_sobrenome',
        celular: 'qualquer_celular',
        email: 'qualquer_email@email.com',
        confirmacaoEMail: 'qualquer_email@email.com',
        senha: 'qualquer_senha'

      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new ErroValidacao('informação obrigatória: creci'))
  })

  test('Verifica se o campo email está ausente ao registrar um corretor', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        primeiroNome: 'qualquer_nome',
        sobrenome: 'qualquer_sobrenome',
        creci: 'qualquer_creci',
        celular: 'qualquer_celular',
        confirmacaoEMail: 'qualquer_email@email.com',
        senha: 'qualquer_senha'

      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new ErroValidacao('informação obrigatória: email'))
  })

  test('Verifica se o campo confirmacaoEmail está ausente ao registrar um corretor', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        primeiroNome: 'qualquer_nome',
        sobrenome: 'qualquer_sobrenome',
        creci: 'qualquer_creci',
        celular: 'qualquer_celular',
        email: 'qualquer_email@email.com',
        senha: 'qualquer_senha'

      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new ErroValidacao('informação obrigatória: confirmacaoEmail'))
  })

  test('Verifica se o campo email é válido', async () => {
    const { sut, validadorEmailStub } = makeSut()

    jest.spyOn(validadorEmailStub, 'estaValido').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        primeiroNome: 'qualquer_nome',
        sobrenome: 'qualquer_sobrenome',
        creci: 'qualquer_creci',
        celular: 'qualquer_celular',
        email: 'qualquer_email@email.com',
        confirmacaoEMail: 'qualquer_email@email.com',
        senha: 'qualquer_senha'

      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new ErroValidacao('campo inválido: email'))
  })

  test('Verifica se o ValidadorEmail usa o e-mail correto', async () => {
    const { sut, validadorEmailStub } = makeSut()

    const metodoEstaValido = jest.spyOn(validadorEmailStub, 'estaValido')

    const httpRequest = {
      body: {
        primeiroNome: 'qualquer_nome',
        sobrenome: 'qualquer_sobrenome',
        creci: 'qualquer_creci',
        celular: 'qualquer_celular',
        email: 'qualquer_email@email.com',
        confirmacaoEMail: 'qualquer_email@email.com',
        senha: 'qualquer_senha'

      }
    }
    await sut.handle(httpRequest)
    expect(metodoEstaValido).toHaveBeenLastCalledWith('qualquer_email@email.com')
  })

  test('Verifica se o RegistroControler retorna codigo http 500 quando ValidadorEmail throws', async () => {
    const { validadorEmailStub, adicionaRegistroStub } = makeSut()

    jest.spyOn(validadorEmailStub, 'estaValido').mockImplementation(() => {
      throw new Error()
    })

    const sut = new RegistroController(validadorEmailStub, adicionaRegistroStub)

    const httpRequest = {
      body: {
        primeiroNome: 'qualquer_nome',
        sobrenome: 'qualquer_sobrenome',
        creci: 'qualquer_creci',
        celular: 'qualquer_celular',
        email: 'qualquer_email@email.com',
        confirmacaoEMail: 'qualquer_email@email.com',
        senha: 'qualquer_senha'

      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ErroServidor(new Error()))
  })

  test('Verifica se o RegistroControler retorna codigo http 400 quando a confirmação de email e email são diferentes', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        primeiroNome: 'qualquer_nome',
        sobrenome: 'qualquer_sobrenome',
        creci: 'qualquer_creci',
        celular: 'qualquer_celular',
        email: 'qualquer_email@email.com',
        confirmacaoEMail: 'outro_email@email.com',
        senha: 'qualquer_senha'

      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new ErroValidacao('campo inválido: confirmacaoEmail diferente de email'))
  })

  test.skip('Verifica se AdicionaRegistro é chamado com os valores corretos', async () => {
    const { sut, adicionaRegistroStub } = makeSut()

    const adicionarSpy = jest.spyOn(adicionaRegistroStub, 'adicionar')

    const httpRequest = {
      body: {
        primeiroNome: 'qualquer_nome',
        sobrenome: 'qualquer_sobrenome',
        creci: 'qualquer_creci',
        celular: 'qualquer_celular',
        email: 'qualquer_email@email.com',
        confirmacaoEMail: 'qualquer_email@email.com',
        senha: 'qualquer_senha'

      }
    }
    await sut.handle(httpRequest)
    expect(adicionarSpy).toHaveBeenLastCalledWith(
      {
        primeiroNome: 'qualquer_nome',
        sobrenome: 'qualquer_sobrenome',
        creci: 'qualquer_creci',
        celular: 'qualquer_celular',
        email: 'qualquer_email@email.com',
        confirmacaoEMail: 'qualquer_email@email.com',
        senha: 'qualquer_senha'

      }
    )
  })

  test('Verifica se o RegistroControler retorna codigo http 500 quando AdicionaRegistro throws', async () => {
    const { validadorEmailStub, adicionaRegistroStub } = makeSut()

    jest.spyOn(adicionaRegistroStub, 'adicionar').mockImplementation(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })

    const sut = new RegistroController(validadorEmailStub, adicionaRegistroStub)

    const httpRequest = {
      body: {
        primeiroNome: 'qualquer_nome',
        sobrenome: 'qualquer_sobrenome',
        creci: 'qualquer_creci',
        celular: 'qualquer_celular',
        email: 'qualquer_email@email.com',
        confirmacaoEMail: 'qualquer_email@email.com',
        senha: 'qualquer_senha'

      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ErroServidor(new Error()))
  })

  test('Verifica se o código 200 se dados válidos são enviados.', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {

        primeiroNome: 'qualquer_nome',
        sobrenome: 'qualquer_sobrenome',
        creci: 'qualquer_creci',
        celular: 'qualquer_celular',
        email: 'qualquer_email@email.com',
        confirmacaoEMail: 'qualquer_email@email.com',
        senha: 'qualquer_senha'

      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(
      {
        id: 1,
        primeiroNome: 'qualquer_nome',
        sobrenome: 'qualquer_sobrenome',
        creci: 'qualquer_creci',
        celular: 'qualquer_celular',
        email: 'qualquer_email@email.com',
        senha: 'qualquer_senha'

      }
    )
  })
})
