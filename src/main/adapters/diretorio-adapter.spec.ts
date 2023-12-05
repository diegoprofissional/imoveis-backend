import { resolve } from "path"
import { DiretorioAdapter } from "./diretorio-adapter"
import fs from 'fs'
const targetFactory = (): DiretorioAdapter => {
  return new DiretorioAdapter()
}

const diretorioFotos = process.env.DIR


jest.mock('fs', () => ({
  readdirSync(): string[] {
    return ['imagem1.jpg', 'imagem2.jpg']
  }
}))

describe('DiretorioAdapter', () => {

  test('deve chamar fs com os parâmetros corretos', () => {

    const target = targetFactory();

    const spyReaddirSync = jest.spyOn(fs, 'readdirSync')

    target.obterFotos('1')

    expect(spyReaddirSync).toHaveBeenLastCalledWith(diretorioFotos + '1')

  })

  test('deve retornar um array de string com as urls das fotos', async () => {

    const target = targetFactory();

    const resultado = await target.obterFotos('1')

    expect(resultado).toEqual([process.env.URL_API?.toString() + '/fotos/' + '1' + '/' + 'imagem1.jpg', process.env.URL_API?.toString() + '/fotos/' + '1' + '/' + 'imagem2.jpg'])

  })

  test('Se fs lançar exceção deve repassar exceção', async () => {

    const target = targetFactory();

    const mockedReaddirSync = jest.spyOn(fs, 'readdirSync');
    mockedReaddirSync.mockImplementationOnce(() => {
      throw new Error('');
    });


    const resultado = target.obterFotos('1')


    expect(resultado).rejects.toThrow()

  })




})