import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { registroControllerFactory } from '../factories/signup'
import { loginControllerFactory } from '../factories/login'
import { casaVendaControllerFactory } from '../factories/casa-venda'

export default (router: Router): void => {
  router.post('/corretores', adaptRoute(registroControllerFactory()))

  router.post('/login', adaptRoute(loginControllerFactory()))

  router.post('/casas-venda', adaptRoute(casaVendaControllerFactory()))

  //router.get('/imoveis', adaptRoute(loginControllerFactory()))

}
