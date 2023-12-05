import { HttpRequest, HttpResponse } from "./http";

export interface PesquisaImoveisResidenciais {

  pesquisar(param: any): Promise<any>

}