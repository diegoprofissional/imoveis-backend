import { JwtAdapter } from './../../infra/criptography/jwt-adapter/jwt-adapter';
import { BcryptAdapter } from './../../infra/criptography/bcrypt-adapter';
import { AutentificacaoDB } from './../../data/usecases/authentication/autentificacao-db';
import { LoginController } from '../../presentation/controller/login/login'
import { Controller } from '../../presentation/protocols/controller'
import { LogControllerDecorator } from '../decorators/log'
import { CorretorRepository } from '../../infra/db/postgres/repositorios/registro-repositorio';

export const loginControllerFactory = (): Controller => {

  const corretorRepository = new CorretorRepository();
  const bcryptAdapter = new BcryptAdapter(12)
  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET)
  const autentificacaoDB = new AutentificacaoDB(corretorRepository, bcryptAdapter, jwtAdapter)
  const loginController = new LoginController(autentificacaoDB)
  return new LogControllerDecorator(loginController)
}
