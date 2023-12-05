export interface ObterPorEmailModel {
  id: number
  primeiroNome: string
  sobrenome: string
  creci: string
  celular: string
  email: string
  senha: string
}

export interface ObterPorEmail {
  obterPorEmail(email: string): Promise<ObterPorEmailModel | undefined>
}
