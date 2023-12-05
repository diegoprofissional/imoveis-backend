import { SenhaValidador } from '../../../domain/usecases/validadores/senha-validador'

export class SenhaValidatorAdapter implements SenhaValidador {
  constructor(private readonly senhaValidador: SenhaValidador) {

  }

  validar(senha: string): boolean {
    return this.senhaValidador.validar(senha)
  }
}
