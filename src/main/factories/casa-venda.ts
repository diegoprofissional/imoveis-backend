import { DiretorioAdapter } from './../adapters/diretorio-adapter';
import { ObtemFotosImoveis } from '../../data/protocols/obtem-fotos-imoveis';
import { CasaVendaRepositorio } from './../../infra/db/postgres/repositorios/casa-venda-repositorio';
import { config } from './../../../config/pg-config';
import { JwtAdapter } from './../../infra/criptography/jwt-adapter/jwt-adapter';
import { BcryptAdapter } from './../../infra/criptography/bcrypt-adapter';
import { AutentificacaoDB } from './../../data/usecases/authentication/autentificacao-db';
import { LoginController } from '../../presentation/controller/login/login'
import { Controller } from '../../presentation/protocols/controller'
import { LogControllerDecorator } from '../decorators/log'
import { CorretorRepository } from '../../infra/db/postgres/repositorios/registro-repositorio';
import env from '../../../config/env'
import { CasaVendaController } from '../../presentation/controller/casa-venda-controller';
import { ImageUploadAdapter } from '../adapters/image-upload-adapter';
import { EnderecoRepositorio } from '../../infra/db/postgres/repositorios/endereco-respositorio';

export const casaVendaControllerFactory = (): Controller => {

  const enderecoRepositorio = new EnderecoRepositorio()

  const diretorioAdapter = new DiretorioAdapter()

  const casaVendaRepositorio = new CasaVendaRepositorio(enderecoRepositorio, diretorioAdapter);


  const imageUploadAdapter = new ImageUploadAdapter(diretorioAdapter)

  const casaVendaController = new CasaVendaController(casaVendaRepositorio, imageUploadAdapter)
  return new LogControllerDecorator(casaVendaController)
}
