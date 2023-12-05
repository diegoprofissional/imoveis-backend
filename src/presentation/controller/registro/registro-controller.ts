import { HttpResponse } from '../../protocols/http';
import { AdicionaRegistro } from '../../../domain/usecases/adicionaRegistro'
import { ErroValidacao, ErroServidor } from '../../errors'
import { Controller } from '../../protocols/controller'
import { ValidadorEmail } from '../../protocols/validador-email'
export class RegistroController implements Controller {
  private readonly validadorEmail: ValidadorEmail
  private readonly adicionaRegistro: AdicionaRegistro

  constructor(validadorEmail: ValidadorEmail, adicionaRegistro: AdicionaRegistro) {
    this.validadorEmail = validadorEmail
    this.adicionaRegistro = adicionaRegistro
  }

  async handle(httpRequest: any): Promise<HttpResponse> {
    try {
      const { primeiroNome, sobrenome, celular, email, creci, senha } = httpRequest.body

      if (!httpRequest.body.primeiroNome) {
        return {
          statusCode: 400,
          body: new ErroValidacao('informação obrigatória: primeiroNome')
        }
      }

      if (!httpRequest.body.sobrenome) {
        return {
          statusCode: 400,
          body: new ErroValidacao('informação obrigatória: sobrenome')
        }
      }

      if (!httpRequest.body.creci) {
        return {
          statusCode: 400,
          body: new ErroValidacao('informação obrigatória: creci')
        }
      }

      if (!httpRequest.body.email) {
        return {
          statusCode: 400,
          body: new ErroValidacao('informação obrigatória: email')
        }
      }

      if (!httpRequest.body.confirmacaoEMail) {
        return {
          statusCode: 400,
          body: new ErroValidacao('informação obrigatória: confirmacaoEmail')
        }
      }

      const emailValido = this.validadorEmail.estaValido(httpRequest.body.email)

      if (!emailValido) {
        return {
          statusCode: 400,
          body: new ErroValidacao('campo inválido: email')
        }
      }

      if (httpRequest.body.confirmacaoEMail !== httpRequest.body.email) {
        return {
          statusCode: 400,
          body: new ErroValidacao('campo inválido: confirmacaoEmail diferente de email')
        }
      }

      const registro = await this.adicionaRegistro.adicionar({
        primeiroNome,
        sobrenome,
        creci,
        celular,
        email,
        senha
      }
      )

      return {
        statusCode: 200,
        body: registro
      }
    } catch (erro) {


      return {
        statusCode: 500,
        body: new ErroServidor(erro)
      }
    }
  }
}
