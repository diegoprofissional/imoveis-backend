import { Encrypter } from '../../protocols/Encrypter';
import { HashComparer } from './../../protocols/hash-comparer'
import { AutentificacaoDB } from './autentificacao-db'
import { CarregarCorretorPorEmailRepositorio } from './../../protocols/carregar-corretor-por-email-repositorio'
import { AdicionaRegistroModel } from './../../../domain/usecases/adicionaRegistro'

export class HashComparerStub implements HashComparer {
  async compare(value: string, hash: string): Promise<boolean> {
    return true
  }
}

export class TokenGeneratorStub implements Encrypter {
  async encrypt(id: string): Promise<string> {
    return new Promise(resolve => resolve('any_token'))
  }
}

describe('AutentificacaoDB', () => {
  /*   test('Deve chamar CarregaCorretorPorEmail com os parâmetros corretos', () => {
      test('', () => {
        class CarregarCorretorPorEmailSub implements CarregarCorretorPorEmailRepositorio {
          async load (email: string): Promise<AdicionaRegistroModel> {
            const conta: AdicionaRegistroModel = {
              nome: 'qualquer_nome',
              sobrenome: 'qualquer_sobrenome',
              creci: 'qualquer_creci',
              celular: 'qualquer_celular',
              email: 'qualquer_email@email.com',
              senha: 'qualquer_senha'
  
            }
            return new Promise(resolve => resolve(conta))
          }
        }
  
        const carregarCorretorPorEmailSub = new CarregarCorretorPorEmailSub()
  
        const hashCompareSpy = new HashComparerStub()
  
        const target = new AutentificacaoDB(carregarCorretorPorEmailSub, hashCompareSpy)
  
        const compareSpy = jest.spyOn(hashComparerStub, 'compare')
  
        expect(target).toHaveBeenCalledWith('qualquer_email@email.com')
      }) */
  // })

  test('', () => {

  })
})
