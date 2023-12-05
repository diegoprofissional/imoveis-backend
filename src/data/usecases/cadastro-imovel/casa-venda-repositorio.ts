import { Casa } from './../../../domain/models/casa';

export interface CadastroCasaVendaRepositorio {

  post: (param: Casa) => Promise<Casa>



}