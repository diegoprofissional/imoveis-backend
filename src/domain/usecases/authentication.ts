import { LoginInfo } from "../models/login-info";
import { RegistroModel } from "../models/registro";

export interface Authentication {
  auth(email: string, senha: string): Promise<LoginInfo | undefined>
}
