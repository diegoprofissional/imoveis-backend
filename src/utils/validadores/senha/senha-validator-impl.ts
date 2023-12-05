import { SenhaValidador } from '../../../domain/usecases/validadores/senha-validador'
export class SenhaValidatorImpl implements SenhaValidador {
  validar(senha: string): boolean {
    if (senha.length >= 4 && senha.length <= 20) {
      return true
    } else {
      return false
    }
  }
}
