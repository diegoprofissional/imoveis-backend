export class ErroPermissao extends Error {
  constructor(e: Error) {
    super(e.message)
    this.name = e.message
    this.stack = e.stack
  }
}
