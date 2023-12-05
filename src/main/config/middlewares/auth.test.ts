import { AuthMiddleware } from './auth';
import { ErroPermissao } from './../../../presentation/errors/erro-permissao';
import { HttpRequest } from './../../../presentation/protocols/http';
import { Decrypter } from '../../../data/protocols/Decrypter';

class CarregarCorretorPorTokenStub implements Decrypter {

  decrypt(value: string): Promise<any> {

    return new Promise(resolve => resolve(''))

  }

}

const carregarCorretorPorTokenStub = new CarregarCorretorPorTokenStub()


const targetFactory = (): AuthMiddleware => {


  const target = new AuthMiddleware(carregarCorretorPorTokenStub)

  return target
}


describe('AuthMiddlewware', () => {
  test('Deve retornar 403 se o x-access-token está ausente do cabeçalho da requisição', async () => {
    const target = targetFactory()
    const httpRequest: HttpRequest = {
      headers: {

      }
    }

    const httpResponse = await target.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(403)
    expect(httpResponse.body.mensagem).toBe('token de acesso inválido')

  })

  test('Deve chamar Decrypter com o token de acesso correto', async () => {
    const target = targetFactory()


    const decryptSpy = jest.spyOn(carregarCorretorPorTokenStub, 'decrypt')


    const httpRequest: HttpRequest = {
      headers: {
        'x-access-token': 'any_token'
      }
    }

    await target.handle(httpRequest)

    expect(decryptSpy).toHaveBeenCalledWith('any_token')

  })

  test('Deve retornar 403 se o x-access-token está ausente do cabeçalho da requisição', async () => {
    const target = targetFactory()
    const httpRequest: HttpRequest = {
      headers: {

      }
    }

    const httpResponse = await target.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(403)
    expect(httpResponse.body.mensagem).toBe('token de acesso inválido')

  })


})