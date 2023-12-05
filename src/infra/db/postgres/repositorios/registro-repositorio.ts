import { AdicionaRegistroModel } from './../../../../domain/usecases/adicionaRegistro'
import { getRepository } from 'typeorm'
import { ObterPorEmail, ObterPorEmailModel } from '../../../../domain/usecases/obterPorEmail'
import { AdicionarRegistroRepositorio } from '../../../../data/protocols/adicionar-registro-repositorio'
import { CorretorModel } from '../models'

export class CorretorRepository implements ObterPorEmail, AdicionarRegistroRepositorio {
  async obterPorEmail(email: string): Promise<ObterPorEmailModel | undefined> {
    const corretorRepo = getRepository(CorretorModel)
    const corretor = await corretorRepo.findOne({ where: { email } })


    if (corretor !== undefined) {
      return corretor
    }
  }

  async adicionar(registro: AdicionaRegistroModel): Promise<CorretorModel> {
    const corretorRepo = getRepository(CorretorModel)
    const corretorDB = await corretorRepo.save(
      registro
    )

    return new Promise((resolve, reject) => resolve(corretorDB))
  }


  carregar: (accessToken: string, role?: string | undefined) => Promise<{ id: number }>

}
