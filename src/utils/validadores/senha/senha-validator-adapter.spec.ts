import { SenhaValidatorAdapter } from './senha-validator-adapter'
import { SenhaValidador } from './../../../domain/usecases/validadores/senha-validador'

export class SenhaValidadorSpy implements SenhaValidador {
  validar(senha: string): boolean {
    return true
  }
}

describe('SenhaValidadorAdapter', () => {
  test('Deve retornar true se validator retorna true ', () => {
    const senhaValidadorSpy = new SenhaValidadorSpy()

    const target = new SenhaValidatorAdapter(senhaValidadorSpy)
    const resultado = target.validar('qualquer_coisa')
    expect(resultado).toBeTruthy()
  })
  test('Deve chamar senhavalidador com o mesmo valor  ', () => {
    const senhaValidadorSpy = new SenhaValidadorSpy()

    const validarSpy = jest.spyOn(senhaValidadorSpy, 'validar')

    const target = new SenhaValidatorAdapter(senhaValidadorSpy)
    target.validar('qualquer_coisa')
    expect(validarSpy).toHaveBeenCalledWith('qualquer_coisa')
  })
})
