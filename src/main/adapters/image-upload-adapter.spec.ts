import sharp from 'sharp';
import { DiretorioAdapter } from './diretorio-adapter';
import { ImageUploadAdapter } from "./image-upload-adapter"
import { mock } from 'jest-mock-extended';

const diretorioAdapter = new DiretorioAdapter()

const targetFactory = (): ImageUploadAdapter => {

  return new ImageUploadAdapter(diretorioAdapter)

}

describe('DiretorioAdapter', () => {

  test.skip('deve chamar sharp com os parâmetros corretos', () => {

    const target = targetFactory();


    const spySharp = mock(sharp)

    target.upload(Buffer.from('any_buffer'), 'any_id')

    expect(spySharp).toHaveBeenCalledWith(Buffer.from('any_buffer'))

  })

  test.skip('deve lançar exceção se sharp lançar exceção', () => {

    /* const target = targetFactory();


    jest.spyOn('sharp', () => {
      return jest.fn().mockImplementation((propriedade: Buffer) => {
        return {
          obterPropriedade: jest.fn().mockReturnValue('d'),
        };
      });
    });

    target.upload(Buffer.from('any_buffer'), 'any_id')

    expect(spySharp).toHaveBeenCalledWith(Buffer.from('any_buffer')) */

  })





}) 