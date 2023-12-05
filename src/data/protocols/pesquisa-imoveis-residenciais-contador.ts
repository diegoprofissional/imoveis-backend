import { ImovelResidencial } from "../../infra/db/postgres/models/ImovelResidencial";
import { TotalizadorPesquisa } from "../../infra/db/postgres/models/totalizador-busca";

export interface PesquisaImoveisResidenciaisContador {

  pesquisarImoveisResidenciaisContador(param: any): Promise<TotalizadorPesquisa>

}