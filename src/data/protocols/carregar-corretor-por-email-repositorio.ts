import { RegistroModel } from '../../domain/models/registro'
import { AdicionaRegistroModel } from '../../domain/usecases/adicionaRegistro'

export interface CarregarCorretorPorEmailRepositorio {
  load(email: string): Promise<RegistroModel>
}
