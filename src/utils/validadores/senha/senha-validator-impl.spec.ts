import { SenhaValidatorImpl } from './senha-validator-impl'
describe('SenhaValidadorImpl', () => {
  const targetFactory = (): SenhaValidatorImpl => { return new SenhaValidatorImpl() }

  test('Deve retornar true se a senha for maior ou igual a 4', () => {
    const target = targetFactory()

    const result = target.validar('12345')

    expect(result).toBeTruthy()
  })

  test('Deve retornar true se a senha for menor ou igual a 20', () => {
    const target = targetFactory()

    const result = target.validar('12345678901234567890')

    expect(result).toBeTruthy()
  })

  test('Deve retornar false se a senha for maior que 20', () => {
    const target = targetFactory()

    const result = target.validar('123456789012341567890')

    expect(result).toBeFalsy()
  })

  test('Deve retornar false se a senha for menor que 4', () => {
    const target = targetFactory()

    const result = target.validar('123')

    expect(result).toBeFalsy()
  })
})
