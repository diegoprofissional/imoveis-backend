import { DiretorioAdapter } from './../../main/adapters/diretorio-adapter';
import { FileStorage } from '../../domain/usecases/file-storage';
import { mock } from 'jest-mock-extended'
import { ImageUploadAdapter } from '../../main/adapters/image-upload-adapter';

interface UploadFile {
  upload: (file: Buffer, key: string) => Promise<void>
}



describe('ImageUploadAdapter', () => {
  test.skip('', async () => {

    const file = Buffer.from('any_file');

    const fileStorage = mock<FileStorage>()

    const diretorioAdapter = new DiretorioAdapter()

    const target = new ImageUploadAdapter(diretorioAdapter)

    await target.upload(fileStorage, '1')

    expect(fileStorage).toHaveBeenCalledWith({ file, key: 'any_id' })

  })
})