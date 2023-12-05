export class ErroValidacao extends Error {
  constructor(causa: string) {
    super(`Erro de validação: (${causa})`)
    this.name = `${causa})`
  }
}
