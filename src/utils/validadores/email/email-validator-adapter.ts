import { ValidadorEmail } from '../../../presentation/protocols'
import validator from 'validator'
export class EmailValidatorAdapter implements ValidadorEmail {
  estaValido (email: string): boolean {
    return validator.isEmail(email)
  }
}
