import { HttpResponse } from './../../presentation/protocols/http'
import { Controller } from '../../presentation/protocols/controller'
import { LogControllerDecorator } from './log'

class ControllerStub implements Controller {
  async handle (request: any): Promise<HttpResponse> {
    const httpResponse = {
      statusCode: 200,
      body: {
        name: 'Rodrigo'
      }
    }

    return new Promise(resolve => resolve(httpResponse))
  }
}

describe('LogControllerDecorator', () => {
  test('Deve chamar o handle do controler', async () => {
    const controllerStub = new ControllerStub()

    const handleSpy = jest.spyOn(controllerStub, 'handle')

    const sut = new LogControllerDecorator(controllerStub)
    const httpRequest = {
      body: {
        nome: 'qualquer_nome',
        sobrenome: 'qualquer_sobrenome',
        creci: 'qualquer_creci',
        celular: 'qualquer_celular',
        email: 'qualquer_email@email.com',
        senha: 'qualquer_senha'
      }
    }

    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
