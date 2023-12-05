import { RegistroModel } from './../../../domain/models/registro';
import { HashComparer } from './../../protocols/hash-comparer'
import { CarregarCorretorPorEmailRepositorio } from './../../protocols/carregar-corretor-por-email-repositorio'
import { Authentication } from '../../../domain/usecases/authentication'
import { Encrypter } from '../../protocols/Encrypter'
import { ObterPorEmail } from '../../../domain/usecases/obterPorEmail'
import { LoginInfo } from '../../../domain/models/login-info';

export class AutentificacaoDB implements Authentication, CarregarCorretorPorEmailRepositorio {
  private readonly carregarCorretorPorEmailRepositorio: ObterPorEmail
  private readonly hashComparer: HashComparer
  private readonly encrypter: Encrypter


  constructor(carregarCorretorPorEmailRepositorio: ObterPorEmail, hashComparer: HashComparer, encrypter: Encrypter) {
    this.carregarCorretorPorEmailRepositorio = carregarCorretorPorEmailRepositorio
    this.hashComparer = hashComparer
    this.encrypter = encrypter
  }

  async auth(email: string, senha: string): Promise<LoginInfo | undefined> {
    const account = await this.carregarCorretorPorEmailRepositorio.obterPorEmail(email)
    if (account) {



      const estaValido = await this.hashComparer.compare(senha, account.senha)

      if (estaValido) {
        const token = await this.encrypter.encrypt(account.id + '')
        const loginInfo: LoginInfo = { token: token, nome: account.primeiroNome }

        return loginInfo
      }

    }
    return undefined
  }
  load(email: string): Promise<RegistroModel> {

    const registroModel: RegistroModel = {
      id: 1,
      primeiroNome: 'qualquer_nome',
      sobrenome: 'qualquer_sobrenome',
      creci: 'qualquer_creci',
      celular: 'qualquer_celular',
      email: 'qualquer_email@email.com',
      senha: 'qualquer_senha'

    }


    return new Promise(resolve => resolve(registroModel))
  }

}
