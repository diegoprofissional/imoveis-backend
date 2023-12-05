import { config } from "../../../../../config/pg-config";
import { CarregaImoveisResidenciaisDestaque } from "../../../../data/protocols/carrega-imoveis-residenciais-destaque";
import { PesquisaImoveisResidenciais } from "../../../../data/protocols/pesquisa-imoveis-residenciais";
import { ImovelResidencial } from "../models/ImovelResidencial";
import { getConnection, getManager } from "typeorm"
import fs from 'fs'
import { PesquisaImoveisResidenciaisContador } from "../../../../data/protocols/pesquisa-imoveis-residenciais-contador";
import { TotalizadorPesquisa } from "../models/totalizador-busca";
import { ObtemFotosImoveis } from "../../../../data/protocols/obtem-fotos-imoveis";
export class PesquisaImoveisRepositorio implements CarregaImoveisResidenciaisDestaque, PesquisaImoveisResidenciais, PesquisaImoveisResidenciaisContador {

  constructor(private readonly obtemFotosImoveis: ObtemFotosImoveis) {

  }

  async carregarImoveisResidenciaisDestaque(): Promise<ImovelResidencial[]> {



    let imoveis = await getManager().query('select * from recuperar_imoveis_residenciais_destaque()')

    imoveis.forEach(async element => {

      element['miniaturasImagens'] = []
      element['fotos'] = []

      if (element.dir != null) {

        const fotos = await this.obtemFotosImoveis.obterFotos(element.dir)

        element.fotos = fotos
        element.miniaturasImagens = fotos

      }
    });

    return new Promise(resolve => resolve(imoveis))

  }


  async pesquisarImoveisResidenciais(req: any): Promise<any> {

    let {
      dormitoriosLimiteInferior = -1,
      dormitoriosLimiteSuperior = -1,
      banheirosLimiteInferior = -1,
      banheirosLimiteSuperior = -1,
      suitesLimiteInferior = -1,
      suitesLimiteSuperior = -1,
      capacidadeGaragemLimiteInferior = -1,
      capacidadeGaragemLimiteSuperior = -1,
      precoLimiteInferior = -1,
      precoLimiteSuperior = -1,
      tiposImoveis = 'casa,apartamento',
      tipoEndereco,
      endereco,
      ordenacao = 'preco',
      pagina = 1
    } = req.query;


    let imoveis = await getManager().query(`select * from pesquisar_imoveis_residenciais_venda(
      ${dormitoriosLimiteInferior}, ${dormitoriosLimiteSuperior}, ${banheirosLimiteInferior}, ${banheirosLimiteSuperior}
        , ${suitesLimiteInferior}, ${suitesLimiteSuperior}, ${capacidadeGaragemLimiteInferior}, ${capacidadeGaragemLimiteSuperior}, ${precoLimiteInferior}
        , ${precoLimiteSuperior}, ${tiposImoveis.includes('casa')}, ${tiposImoveis.includes('apartamento')}
        , '${tipoEndereco}', '${endereco}', '${ordenacao}', '${pagina}'
      
        ) `)

    imoveis.forEach(async element => {

      element['miniaturasImagens'] = []
      element['fotos'] = []

      if (element.dir != null) {

        const fotos = await this.obtemFotosImoveis.obterFotos(element.dir)

        element.fotos = fotos
        element.miniaturasImagens = fotos

      }
    });

    return new Promise(resolve => resolve(imoveis))


  }

  async pesquisarImoveisResidenciaisContador(req: any): Promise<TotalizadorPesquisa> {

    let {
      dormitoriosLimiteInferior = -1,
      dormitoriosLimiteSuperior = -1,
      banheirosLimiteInferior = -1,
      banheirosLimiteSuperior = -1,
      suitesLimiteInferior = -1,
      suitesLimiteSuperior = -1,
      capacidadeGaragemLimiteInferior = -1,
      capacidadeGaragemLimiteSuperior = -1,
      precoLimiteInferior = -1,
      precoLimiteSuperior = -1,
      tiposImoveis = 'casa,apartamento',
      tipoEndereco,
      endereco,
    } = req.query;



    let resultado = await getManager().query(`select * from pesquisar_imoveis_residenciais_venda_contador(
      ${dormitoriosLimiteInferior}, ${dormitoriosLimiteSuperior}, ${banheirosLimiteInferior}, ${banheirosLimiteSuperior}
        , ${suitesLimiteInferior}, ${suitesLimiteSuperior}, ${capacidadeGaragemLimiteInferior}, ${capacidadeGaragemLimiteSuperior}, ${precoLimiteInferior}
        , ${precoLimiteSuperior}, ${tiposImoveis.includes('casa')}, ${tiposImoveis.includes('apartamento')}
        , '${tipoEndereco}', '${endereco}'
      
        ) `)


    let totalizadorPesquisa: TotalizadorPesquisa = new TotalizadorPesquisa()

    totalizadorPesquisa.resultado = resultado;
    totalizadorPesquisa.total_geral = 0;

    for (let i = 0; i < totalizadorPesquisa.resultado.length; i++) {

      if (totalizadorPesquisa.resultado[i].numero_registros == 0) {
        totalizadorPesquisa.total_geral += totalizadorPesquisa.resultado[i].numero_registros
        totalizadorPesquisa.resultado.splice(i, 1)

      }
    }
    return new Promise(resolve => resolve(totalizadorPesquisa))

  }

}