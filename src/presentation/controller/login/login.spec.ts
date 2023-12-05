import { LoginInfo } from '../../../domain/models/login-info'
import { Authentication } from './../../../domain/usecases/authentication'
import { ErroValidacao } from './../../errors/erro-validacao'
import { HttpRequest } from './../../protocols/http'
import { LoginController } from './login'

class AuthenticationStub implements Authentication {
  async auth(email: string, senha: string): Promise<LoginInfo> {
    return { nome: 'quaquer_nome', token: 'any_token' }
  }
}

interface factoryTypes {
  target: LoginController
  authenticationStub: Authentication
}

const targetFactory = (): factoryTypes => {
  const authenticationStub = new AuthenticationStub()
  const target = new LoginController(authenticationStub)

  return { target, authenticationStub }
}

describe('LoginController', () => {
  test('Deve retonar 400 se email não é enviado', async () => {
    const { target } = targetFactory()

    const httpRequest: HttpRequest = {
      body: {
        senha: 'any_senha'
      }
    }

    const resultado = await target.handle(httpRequest)

    expect(resultado.body).toEqual(new ErroValidacao('email'))
  })

  test('Deve retonar 400 se senha não é enviado', async () => {
    const { target } = targetFactory()

    const httpRequest: HttpRequest = {
      body: {
        usuario: 'any_email@email'
      }
    }

    const resultado = await target.handle(httpRequest)

    expect(resultado.body).toEqual(new ErroValidacao('senha'))
  })

  test('autnetication return', async () => {
    const { target, authenticationStub } = targetFactory()

    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise(resolve => resolve(undefined)))

    const httpRequest: HttpRequest = {
      body: {
        usuario: 'any_email@email',
        senha: 'any_senha'
      }
    }

    const httpResponse = await target.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(401)
  })
})
