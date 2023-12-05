export interface AtualizaRegistroModel {
  id: number
  nome?: string
  sobrenome?: string
  creci?: string
  celular?: string
  email?: string
  senha?: string
}

export interface AtualizaRegistro {
  atualizar(params: AtualizaRegistroModel): Promise<AtualizaRegistro.Result>
}

export namespace AtualizaRegistro {

  export type Result = boolean

}
