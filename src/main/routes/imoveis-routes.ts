import { CorretorRepository } from './../../infra/db/postgres/repositorios/registro-repositorio';
import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { imoveisResidenciaisDestaquesControllerFactory } from '../factories/imoveis-residenciais-destaque';
import { pesquisaImoveisResidenciaisControllerFactory } from '../factories/pesquisa-imoveis-residenciais';
import { pesquisaImoveisResidenciaisContadorControllerFactory } from '../factories/pesquisa-imoveis-residenciais-contador';


export default (router: Router): void => {


  router.get('/imoveis/destaques', adaptRoute(imoveisResidenciaisDestaquesControllerFactory()))

  router.get('/imoveis/residenciais-venda', adaptRoute(pesquisaImoveisResidenciaisControllerFactory()))

  router.get('/imoveis/residenciais-venda/contador', adaptRoute(pesquisaImoveisResidenciaisContadorControllerFactory()))




}
