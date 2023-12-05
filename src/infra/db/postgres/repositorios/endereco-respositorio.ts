import { getRepository } from "typeorm";
import { CadastroEnderecoRepositorio } from "../../../../data/usecases/endereco-repositorio";
import { Endereco } from "../../../../domain/models/endereco";
import { EnderecoModel } from "../models";

export class EnderecoRepositorio implements CadastroEnderecoRepositorio {



  async adicionar(endereco: Endereco): Promise<number> {

    const enderecoRepository = getRepository(EnderecoModel)

    const enderecoDB = await enderecoRepository.save(endereco)

    return new Promise(resolve => resolve(enderecoDB.id))

  }

}