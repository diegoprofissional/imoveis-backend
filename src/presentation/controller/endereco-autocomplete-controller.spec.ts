import { HttpRequest } from './../protocols/http';
import { EnderecoAutocomplete } from '../../domain/models/endereco-autocomplete';
import { Endereco } from './../../domain/models/endereco';
import { EnderecoService } from '../../data/usecases/endereco-service';
import { EnderecoAutocompleteController } from './endereco-autocomplete-controller';


const mockEnderecos = (): EnderecoAutocomplete[] => {

  return [
    {
      descricao: 'descricao teste',
      escopoBusca: 'logradouro',
      endereco:
      {
        logradouro: "Rua Alegria",
        bairro: "Centro",
        cidade: "Franca",
        estado: "São Paulo",
        pais: "Brasil",
      }
    },
    {
      descricao: 'descricao teste',
      escopoBusca: 'logradouro',
      endereco:
      {
        logradouro: "Avenida Paz",
        bairro: "Jardim Francano",
        cidade: "Franca",
        estado: "São Paulo",
        pais: "Brasil",
      }
    },
  ];


}


export class EnderecoServiceStub implements EnderecoService {

  async buscar(endereco: string): Promise<EnderecoAutocomplete[]> {

    return new Promise(resolve => resolve(mockEnderecos()))

  }

}


describe('EnderecoAutocompleteController', () => {
  test('Deve chamar método busca de EnderecoService', () => {

    const enderecoServiceStub = new EnderecoServiceStub()

    const buscaSpy = jest.spyOn(enderecoServiceStub, 'buscar');

    const httpRequest: HttpRequest = {
      query: { endereco: 'qualquer_endereco' }
    }

    const target = new EnderecoAutocompleteController(enderecoServiceStub)


    target.handle(httpRequest)

    expect(buscaSpy).toHaveBeenCalled()

  })


  test('Deve retonar os dados corretos de EnderecoService', async () => {

    const enderecoServiceStub = new EnderecoServiceStub()

    const buscaSpy = jest.spyOn(enderecoServiceStub, 'buscar');

    const httpRequest: HttpRequest = {
      query: { endereco: 'qualquer_endereco' }
    }

    const target = new EnderecoAutocompleteController(enderecoServiceStub)

    const resultado = await target.handle(httpRequest)

    expect(resultado.body).toEqual(mockEnderecos())

  })

  test('Deve retornar status code 400 se o endereço tiver menos que 3 caracteres', async () => {

    const argumentoDoisCaracteres = 'qa'

    const enderecoServiceStub = new EnderecoServiceStub()

    const httpRequest: HttpRequest = {
      query: { endereco: argumentoDoisCaracteres }
    }

    const target = new EnderecoAutocompleteController(enderecoServiceStub)

    const resultado = await target.handle(httpRequest)

    expect(resultado.statusCode).toBe(400)

  })

  test('Deve retornar 500 se EnderecoService lançar exceção ', async () => {


    const enderecoServiceStub = new EnderecoServiceStub()

    const httpRequest: HttpRequest = {
      query: { endereco: 'qualquer_endereco' }
    }

    jest.spyOn(enderecoServiceStub, 'buscar').mockImplementationOnce(() => {
      throw new Error('');
    });



    const target = new EnderecoAutocompleteController(enderecoServiceStub)

    const resultado = target.handle(httpRequest)

    expect((await resultado).statusCode).toBe(500)

  })

})