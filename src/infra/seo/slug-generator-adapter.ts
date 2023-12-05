import slugify from 'slugify'
import { SlugGenerator } from '../../data/protocols/slug-generator'

export class SlugGeneratorAdapter implements SlugGenerator {
  gerar (param: string): string {
    slugify(param)
    return 'any_value'
  }
}
