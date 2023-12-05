import { SlugGeneratorAdapter } from './slug-generator-adapter'
import slugify from 'slugify'

describe('SlugGenerator Adapter', () => {
  test('Deve chamar slug generator com os parâmetros corretos. ', () => {
    const target = new SlugGeneratorAdapter()

    const slugifySpy = jest.fn(slugify)
    slugifySpy('any text')
    target.gerar('any text')
    expect(slugifySpy).toHaveBeenCalledWith('any text')
  }

  )
})
