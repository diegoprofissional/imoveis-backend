import { Endereco } from "../../domain/models/endereco";

export interface CadastroEnderecoRepositorio {
  adicionar(endereco: Endereco): Promise<number>
}