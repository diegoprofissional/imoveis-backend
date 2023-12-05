import { CorretorRepository } from './../../infra/db/postgres/repositorios/registro-repositorio';
import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { registroControllerFactory } from '../factories/signup'
import { loginControllerFactory } from '../factories/login'
import { casaVendaControllerFactory } from '../factories/casa-venda'
import { AuthMiddleware } from '../config/middlewares/auth'
import { adaptMiddleware } from '../adapters/express-middleware-adapter';
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory';
import { multerAdapter } from '../adapters/multer.adapter';
import { casaVendaPorIdControllerFactory } from '../factories/casa-venda-por-id';

export default (router: Router): void => {


  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))

  router.post('/casas-venda', adminAuth, multerAdapter, adaptRoute(casaVendaControllerFactory()))

  router.get('/casas-venda/:id', adaptRoute(casaVendaPorIdControllerFactory()))


}
