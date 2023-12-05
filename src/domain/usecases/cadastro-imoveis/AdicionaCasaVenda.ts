import { Casa } from "../../models/casa";

export interface AdicionaCasaVenda {
  adicionar(param: Casa): Promise<Casa>
}