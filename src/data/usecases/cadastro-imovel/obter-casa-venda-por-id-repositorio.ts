import { Casa } from './../../../domain/models/casa';

export interface ObterCasaVendaPorIdRepositorio {

  obterCasaVendaPorId: (id: number) => Promise<Casa | undefined>



}