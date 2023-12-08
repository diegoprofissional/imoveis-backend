import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { casaVendaControllerFactory } from '../factories/casa-venda'
import { adaptMiddleware } from '../adapters/express-middleware-adapter';
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory';
import { multerAdapter } from '../adapters/multer.adapter';
import { casaVendaPorIdControllerFactory } from '../factories/casa-venda-por-id';

export default (router: Router): void => {


  const adminAuth = adaptMiddleware(makeAuthMiddleware('anunciante'))

  router.post('/casas-venda', adminAuth, multerAdapter, adaptRoute(casaVendaControllerFactory()))

  router.get('/casas-venda/:id', adaptRoute(casaVendaPorIdControllerFactory()))

  router.get('/teste', (req, res) => {
    res.send('testando..')
  })


}
