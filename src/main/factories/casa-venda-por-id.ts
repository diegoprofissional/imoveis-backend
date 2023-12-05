import { DiretorioAdapter } from './../adapters/diretorio-adapter';
import { EnderecoRepositorio } from './../../infra/db/postgres/repositorios/endereco-respositorio';
import { ObterCasaVendaPorIdRepositorio } from './../../data/usecases/cadastro-imovel/obter-casa-venda-por-id-repositorio';
import { CasaVendaRepositorio } from './../../infra/db/postgres/repositorios/casa-venda-repositorio';
import { config } from './../../../config/pg-config';
import { JwtAdapter } from './../../infra/criptography/jwt-adapter/jwt-adapter';
import { BcryptAdapter } from './../../infra/criptography/bcrypt-adapter';
import { AutentificacaoDB } from './../../data/usecases/authentication/autentificacao-db';
import { LoginController } from '../../presentation/controller/login/login'
import { Controller } from '../../presentation/protocols/controller'
import { LogControllerDecorator } from '../decorators/log'
import { CasaVendaController } from '../../presentation/controller/casa-venda-controller';
import { CasaVendaPorIdController } from '../../presentation/controller/casa-venda-por-id-Controller';


export const casaVendaPorIdControllerFactory = (): Controller => {

  const enderecoRepositorio = new EnderecoRepositorio()


  const diretorioAdapter = new DiretorioAdapter()

  const casaVendaRepositorio = new CasaVendaRepositorio(enderecoRepositorio, diretorioAdapter);


  const casaVendaController = new CasaVendaPorIdController(casaVendaRepositorio)
  return new LogControllerDecorator(casaVendaController)
}
