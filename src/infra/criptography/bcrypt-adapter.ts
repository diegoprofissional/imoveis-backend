import bcrypt from 'bcrypt'
import { Hasher } from '../../data/protocols/hasher'
export class BcryptAdapter implements Hasher {
  private readonly salt
  constructor(salt: number) {
    this.salt = salt
  }

  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, 12)

    return hash
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const estaValido = await bcrypt.compare(value, hash)
    return estaValido
  }

}
