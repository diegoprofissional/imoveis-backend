import { ImovelResidencial } from "../../infra/db/postgres/models/ImovelResidencial";

export interface CarregaImoveisDestaqueRepositorio {
  carregar(): Promise<ImovelResidencial[]>
}