import { Apartamento } from "../../models/apartamento";

export interface AdicionaApartamentoVenda {
  adicionar(param: Apartamento): Promise<Apartamento>
}