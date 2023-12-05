import { EnderecoAutocomplete } from './../../domain/models/endereco-autocomplete';
import { GoogleApiAdapter } from './google-api-adapter';
import { respostaEnderecoApi, respostaApiFormatada } from './helpers/google-api-mock.not.test';

import axios from 'axios'


jest.mock('axios')


const targetFactory = (): GoogleApiAdapter => {

  return new GoogleApiAdapter()

}

describe('GoogleApiAdapter', () => {
  test.skip('Deve chamar a API do google ', () => {


    const target = targetFactory()


    const mockJest = axios as jest.Mocked<typeof axios>

    const mockAxiosGet = jest.spyOn(mockJest, "get");



    target.buscar('franca sp')

    expect(mockAxiosGet).toHaveBeenCalledWith(expect.stringContaining('https://maps.googleapis.com/maps/api/place/autocomplete/json'))

  })

  test('Deve chamar a API do google API e retornar dados no formato correto', async () => {


    const mockJest = axios as jest.Mocked<typeof axios>

    const target = targetFactory()


    mockJest.get.mockResolvedValueOnce({ status: 200, data: respostaEnderecoApi });


    const resultado = await target.buscar('franca sp')

    expect(resultado).toEqual(respostaApiFormatada)

  })

  test('Deve repassar a exceção se o axios retornar uma exceção', async () => {


    const mockJest = axios as jest.Mocked<typeof axios>

    const target = targetFactory()


    mockJest.get.mockRejectedValueOnce(new Promise(resolve => resolve(new Error())));


    const resultado = target.buscar('franca sp')

    expect(resultado).rejects.not.toThrow()

  })

  test('Deve retornar undefined se a resposta da api for diferente de 200', async () => {


    const mockJest = axios as jest.Mocked<typeof axios>

    const target = targetFactory()


    mockJest.get.mockResolvedValueOnce({ status: 500, data: respostaEnderecoApi });


    const resultado = await target.buscar('franca sp')

    expect(resultado).toEqual(undefined)

  })



})