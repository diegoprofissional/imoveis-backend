import { Corretor } from '../../domain/models/corretor'
import { AdicionaRegistroModel } from '../../domain/usecases/adicionaRegistro'

export interface AdicionarRegistroRepositorio {
  adicionar(corretor: AdicionaRegistroModel): Promise<Corretor>
}
