import { BcryptAdapter } from './../../infra/criptography/bcrypt-adapter'
import { AdicionaRegistroDB } from './../../data/usecases/adiciona-registro/adiciona-registro-db'
import { EmailValidatorAdapter } from './../../utils/validadores/email/email-validator-adapter'
import { RegistroController } from '../../presentation/controller/registro/registro-controller'
import { CorretorRepository } from '../../infra/db/postgres/repositorios/registro-repositorio'
import { LogControllerDecorator } from '../decorators/log'
import { Controller } from '../../presentation/protocols/controller'

export const registroControllerFactory = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const corretorRepository = new CorretorRepository()
  const adicionaRegistroDB = new AdicionaRegistroDB(bcryptAdapter, corretorRepository)
  const registroController = new RegistroController(emailValidatorAdapter, adicionaRegistroDB)
  return new LogControllerDecorator(registroController)
}
