import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const targetFactory = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidatorAdapter', () => {
  test('Deve retornar false se validator returns false', () => {
    const target = targetFactory()

    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    const estaValido = target.estaValido('invalid_email@mail.com')
    expect(estaValido).toBe(false)
  })

  test('Deve retornar true se validator returns true', () => {
    const target = targetFactory()
    const estaValido = target.estaValido('invalid_email@mail.com')
    expect(estaValido).toBe(true)
  })

  test('Deve chamar o validator com o email certo', () => {
    const target = new EmailValidatorAdapter()
    const estaValidoSpy = jest.spyOn(validator, 'isEmail')
    target.estaValido('qualquer_email@mail.com')
    expect(estaValidoSpy).toHaveBeenCalledWith('qualquer_email@mail.com')
  })
})
