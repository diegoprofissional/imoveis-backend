import slugify from "slugify";
import { FileStorage } from "../../domain/usecases/file-storage";
import sharp from "sharp";
import { ObtemFotosImoveis } from "../../data/protocols/obtem-fotos-imoveis";
import { EnumeraDiretorioFotos } from "../../data/protocols/enumera-diretorio-fotos";


require('dotenv').config();
const fs = require('fs')





export class ImageUploadAdapter implements FileStorage {

  constructor(private readonly enumeraDiretorioFotos: EnumeraDiretorioFotos) {

  }

  async upload(buffer: any, id: string): Promise<string> {

    const { proximoSubdiretorio, novoSubdiretorioFotos } = await this.enumeraDiretorioFotos.obterProximoDiretorio()


    for (var i = 0; i < buffer.length; i++) {

      console.log("proximo", proximoSubdiretorio)

      await sharp(buffer[i].buffer).resize({ width: 1024, height: 768 }).toFile(novoSubdiretorioFotos + "/" + slugify("casa") + i + '.jpg');


    }


    return new Promise(resolve => resolve(proximoSubdiretorio.toString()))

  }

}