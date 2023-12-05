import { Endereco } from "./endereco"

export interface Casa {
  id?: number
  idAnunciante: number,
  idEndereco: number,
  dormitorios: number,
  suites: number,
  banheiros: number,
  capacidadeGaragem: number,
  areaTerreno: number,
  areaConstruida: number,
  iptu: number,
  preco: number,
  dir: string
  endereco?: Endereco,
  miniaturasFotos?: string[]
  fotos?: string[]
}

