import { PesquisaImoveisResidenciaisController } from '../../presentation/controller/imoveis/pesquisa-imoveis-residenciais-controller';
import { ImoveisResidenciaisDestaquesController } from '../../presentation/controller/imoveis/imoveis-residenciais-destaques-controller';
import { PesquisaImoveisRepositorio } from '../../infra/db/postgres/repositorios/pesquisa-imoveis-repositorio';
import { Controller } from '../../presentation/protocols/controller'
import { LogControllerDecorator } from '../decorators/log'
import { DiretorioAdapter } from '../adapters/diretorio-adapter';
import { PesquisaImoveisResidenciaisContadorController } from '../../presentation/controller/imoveis/pesquisa-imoveis-residenciais-contador-controller';

export const pesquisaImoveisResidenciaisContadorControllerFactory = (): Controller => {


  const diretorioAdapter = new DiretorioAdapter()
  const pesquisaImoveisRepositorio = new PesquisaImoveisRepositorio(diretorioAdapter);


  const pesquisaImoveisResidenciaisContadorController = new PesquisaImoveisResidenciaisContadorController(pesquisaImoveisRepositorio)
  return new LogControllerDecorator(pesquisaImoveisResidenciaisContadorController)
}
