import { CorretorRepository } from './../../infra/db/postgres/repositorios/registro-repositorio';
import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { enderecoAutocompleteControllerFactory } from '../factories/endereco';


export default (router: Router): void => {


  router.get('/enderecos', adaptRoute(enderecoAutocompleteControllerFactory()))


}
