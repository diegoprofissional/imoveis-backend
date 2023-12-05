export interface AdicionaRegistroModel {
  primeiroNome: string
  sobrenome: string
  creci: string
  celular: string
  email: string
  senha: string
}

export interface AdicionaRegistro {
  adicionar(registro: AdicionaRegistroModel): Promise<AdicionaRegistro.Resultado | null>
}

export namespace AdicionaRegistro {
  export interface Resultado {
    id: number
  }
}
