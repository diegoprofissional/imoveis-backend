import { AdicionaRegistro, AdicionaRegistroModel } from '../../../domain/usecases/adicionaRegistro'
import { AdicionarRegistroRepositorio } from '../../protocols/adicionar-registro-repositorio'
import { Hasher } from '../../protocols/hasher'

export class AdicionaRegistroDB implements AdicionaRegistro {
  private readonly hasher: Hasher
  private readonly adicionarRegistroRepositorio: AdicionarRegistroRepositorio

  constructor(encrypter: Hasher, adicionarRegistroRepositorio: AdicionarRegistroRepositorio) {
    this.hasher = encrypter
    this.adicionarRegistroRepositorio = adicionarRegistroRepositorio
  }

  async adicionar(registro: AdicionaRegistroModel): Promise<AdicionaRegistro.Resultado | null> {
    const hash = await this.hasher.hash(registro.senha)

    const registroDB = await this.adicionarRegistroRepositorio.adicionar(Object.assign({}, registro, { senha: hash }))
    return new Promise((resolve, reject) => { resolve(registroDB) })
  }
}
