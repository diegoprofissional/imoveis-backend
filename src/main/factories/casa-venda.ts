import { DiretorioAdapter } from './../adapters/diretorio-adapter';
import { CasaVendaRepositorio } from './../../infra/db/postgres/repositorios/casa-venda-repositorio';
import { Controller } from '../../presentation/protocols/controller'
import { LogControllerDecorator } from '../decorators/log'
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
