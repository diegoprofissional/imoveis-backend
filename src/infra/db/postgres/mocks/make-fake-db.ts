import { DataType, IMemoryDb, newDb } from 'pg-mem'
import { CasaVendaModel, CorretorModel, EnderecoModel } from '../models'
export const makeFakeDb = async (): Promise<IMemoryDb> => {
  const db = newDb()

  const connection = await db.adapters.createTypeormConnection({
    type: 'postgres',

    entities: [CorretorModel, CasaVendaModel, EnderecoModel]
  })



  await connection.synchronize()
  return db
}
