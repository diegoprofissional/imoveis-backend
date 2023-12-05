import { CorretorRepository } from './registro-repositorio';
import { CadastroCasaVendaRepositorio } from "../../../../data/usecases/cadastro-imovel/casa-venda-repositorio";
import { Repository, getRepository } from 'typeorm';
import { CasaVendaModel } from '../models/casa-venda-model';
import { Casa } from '../../../../domain/models/casa';
import { EnderecoModel } from '../models';
import { CadastroEnderecoRepositorio } from '../../../../data/usecases/endereco-repositorio';
import { ObterCasaVendaPorIdRepositorio } from '../../../../data/usecases/cadastro-imovel/obter-casa-venda-por-id-repositorio';
import { ObtemFotosImoveis } from '../../../../data/protocols/obtem-fotos-imoveis';

export class CasaVendaRepositorio implements CadastroCasaVendaRepositorio, ObterCasaVendaPorIdRepositorio {


  constructor(private readonly enderecoRepository: CadastroEnderecoRepositorio, private readonly acessaDiretorio: ObtemFotosImoveis) {

  }

  async post(param: any): Promise<Casa> {

    const casaVendaRepository = getRepository(CasaVendaModel)


    const endereco = { idAnunciante: 1, logradouro: param.logradouro, bairro: param.bairro, cidade: param.cidade, estado: param.estado, pais: param.pais, cep: param.cep }

    const idEnderecoGerado = await this.enderecoRepository?.adicionar(endereco);

    const casaVendaDB = await casaVendaRepository.save({
      dir: param.dir,
      idAnunciante: param.idAnunciante,
      idEndereco: idEnderecoGerado,
      dormitorios: param.dormitorios,
      suites: param.suites,
      banheiros: param.banheiros,
      capacidadeGaragem: param.capacidadeGaragem,
      preco: param.preco
    })



    return casaVendaDB

  }

  async obterCasaVendaPorId(id: number): Promise<Casa | undefined> {

    const casaVendaRepository = getRepository(CasaVendaModel)

    try {

      const casaDB = await casaVendaRepository.findOne({ where: { id: id }, relations: ['endereco', 'corretor'] })

      if (casaDB) {




        const fotos = await this.acessaDiretorio.obterFotos(casaDB.dir)
        casaDB.fotos = fotos;
        casaDB.miniaturasFotos = fotos;
      }

      return new Promise(resolve => resolve(casaDB))
    } catch (error) {
      throw error
    }

  }

}