import { Decrypter } from "../../../data/protocols/Decrypter";
import { Encrypter } from "../../../data/protocols/Encrypter";
import jwt from 'jsonwebtoken'
export class JwtAdapter implements Encrypter, Decrypter {

  private readonly secret: string

  constructor(secret: string) {
    this.secret = secret
  }

  async encrypt(value: string): Promise<string> {
    const token = await jwt.sign({ id: value }, this.secret)
    return new Promise(resolve => resolve(token))
  }

  async decrypt(token: string): Promise<any> {
    const value: any = await jwt.verify(token, process.env.JWT_SECRET, { complete: true })
    return new Promise(resolve => resolve(value))
  }

}