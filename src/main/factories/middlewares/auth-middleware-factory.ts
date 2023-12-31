import { JwtAdapter } from './../../../infra/criptography/jwt-adapter/jwt-adapter';
import { Middleware } from "../../../presentation/protocols/middleware";
import { AuthMiddleware } from "../../config/middlewares/auth";

export const makeAuthMiddleware = (role?: string): Middleware => {

  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET)

  return new AuthMiddleware(jwtAdapter)

}