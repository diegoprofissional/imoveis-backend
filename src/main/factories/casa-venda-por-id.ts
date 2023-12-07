import { DiretorioAdapter } from './../adapters/diretorio-adapter';
import { EnderecoRepositorio } from './../../infra/db/postgres/repositorios/endereco-respositorio';
import { CasaVendaRepositorio } from './../../infra/db/postgres/repositorios/casa-venda-repositorio';
import { Controller } from '../../presentation/protocols/controller'
import { LogControllerDecorator } from '../decorators/log'
import { CasaVendaPorIdController } from '../../presentation/controller/casa-venda-por-id-Controller';


export const casaVendaPorIdControllerFactory = (): Controller => {

  const enderecoRepositorio = new EnderecoRepositorio()


  const diretorioAdapter = new DiretorioAdapter()

  const casaVendaRepositorio = new CasaVendaRepositorio(enderecoRepositorio, diretorioAdapter);


  const casaVendaController = new CasaVendaPorIdController(casaVendaRepositorio)
  return new LogControllerDecorator(casaVendaController)
}
