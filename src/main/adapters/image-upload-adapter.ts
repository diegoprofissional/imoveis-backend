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

    const proximoSubdiretorioImagens = this.enumeraDiretorioFotos.obterProximoDiretorio()


    for (var i = 0; i < buffer.length; i++) {



      await sharp(buffer[i].buffer).resize({ width: 1024, height: 768 }).toFile(proximoSubdiretorioImagens + "/" + slugify("casa") + i + '.jpg');


    }


    return new Promise(resolve => resolve(proximoSubdiretorioImagens))

  }

}