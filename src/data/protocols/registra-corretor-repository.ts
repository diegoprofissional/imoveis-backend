import { Corretor } from '../../domain/models/corretor'

export interface RegistraCorretorRepository {
  registraCorretor(params: Corretor): Promise<Corretor>
}
