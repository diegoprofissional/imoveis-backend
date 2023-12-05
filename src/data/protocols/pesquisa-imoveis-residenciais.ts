import { ImovelResidencial } from "../../infra/db/postgres/models/ImovelResidencial";

export interface PesquisaImoveisResidenciais {

  pesquisarImoveisResidenciais(param: any): Promise<any>

}