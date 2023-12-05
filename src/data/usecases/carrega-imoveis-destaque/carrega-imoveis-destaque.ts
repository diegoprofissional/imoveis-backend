import { ImovelResidencial } from '../../../infra/db/postgres/models/ImovelResidencial';
import { CarregaImoveisDestaqueRepositorio } from './../../protocols/carrega-imoveis-destaque-repositorio';

export class CarregaImoveisDestaque {

  constructor(private readonly carregaImoveisDestaqueRepositorio: CarregaImoveisDestaqueRepositorio) {

  }

  async carregar(): Promise<ImovelResidencial[]> {

    const imoveis = await this.carregaImoveisDestaqueRepositorio.carregar()

    return new Promise(resolve => resolve(imoveis))
  }


}