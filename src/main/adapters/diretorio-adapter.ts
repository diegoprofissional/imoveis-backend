import fs from 'fs'
import { ObtemFotosImoveis } from '../../data/protocols/obtem-fotos-imoveis'
import { EnumeraDiretorioFotos } from '../../data/protocols/enumera-diretorio-fotos'
import config from '../../../config/sistema.config'
const diretorioFotos = config.DirFotos

export class DiretorioAdapter implements ObtemFotosImoveis, EnumeraDiretorioFotos {



  async obterFotos(diretorio: string): Promise<string[]> {

    let fotos: string[] = []

    const resultado: string[] = fs.readdirSync(diretorioFotos + diretorio)


    for (let i of resultado) {
      const foto = config.urlApi?.toString() + '/fotos/' + diretorio + '/' + i;

      fotos.push(foto)
    }

    return new Promise(resolve => resolve(fotos));

  }

  async obterProximoDiretorio(): Promise<{ proximoSubdiretorio: number, novoSubdiretorioFotos: string }> {

    try {

      if (diretorioFotos) {
        const proximoSubdiretorio = fs.readdirSync(diretorioFotos + '').length + 1;

        const novoSubdiretorioFotos = diretorioFotos + '' + (proximoSubdiretorio);

        fs.mkdirSync(novoSubdiretorioFotos);


        return new Promise(resolve => resolve({ proximoSubdiretorio, novoSubdiretorioFotos }))
      } else {
        throw new Error()
      }
    } catch (error) {

      throw error

    }


  }

}
