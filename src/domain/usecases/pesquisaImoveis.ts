import { Imovel } from './../../infra/db/postgres/models/Imovel';
export interface PesquisaImoveis {
  pesquisar: (params: object) => Promise<Imovel[]>
}