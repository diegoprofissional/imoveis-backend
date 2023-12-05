import { ImovelResidencial } from "../../infra/db/postgres/models/ImovelResidencial";

export interface CarregaImoveisResidenciaisDestaque {

  carregarImoveisResidenciaisDestaque(): Promise<ImovelResidencial[]>

}