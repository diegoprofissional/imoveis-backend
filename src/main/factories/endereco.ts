import { GoogleApiAdapter } from './../../infra/apis-externas/google-api-adapter';
import { ImoveisResidenciaisDestaquesController } from './../../presentation/controller/imoveis/imoveis-residenciais-destaques-controller';
import { PesquisaImoveisRepositorio } from './../../infra/db/postgres/repositorios/pesquisa-imoveis-repositorio';
import { Controller } from '../../presentation/protocols/controller'
import { LogControllerDecorator } from '../decorators/log'
import { EnderecoAutocompleteController } from '../../presentation/controller/endereco-autocomplete-controller';


export const enderecoAutocompleteControllerFactory = (): Controller => {

  const googleApiAdapter = new GoogleApiAdapter();

  const enderecoAutocompeController = new EnderecoAutocompleteController(googleApiAdapter)
  return new LogControllerDecorator(enderecoAutocompeController)
}
