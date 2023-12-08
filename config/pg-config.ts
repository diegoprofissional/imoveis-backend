import path from 'path'
import { ConnectionOptions } from 'typeorm'

console.log("output", process.env.POSTGRES_DATABASE)
console.log('teste', process.env.POSTGRES_PASSWORD)

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,



  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ['src/infra/db/postgres/models/index.ts'],
  synchronize: false,
  logging: true,
  migrations: [path.join(__dirname, '..', 'src/src/infra/db/postgres/migrations/**/*.js')],
  cli: {
    migrationsDir: 'src/infra/db/postgres/migrations'
  }
}
