import path from 'path'
import { ConnectionOptions } from 'typeorm'

console.log('models path', path.join(__dirname, '..', 'src/src/infra/db/postgres/models/index.js'))

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,


  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [path.join(__dirname, '..', 'src/src/infra/db/postgres/models/index.js')],
  synchronize: false,
  logging: true,
  migrations: [path.join(__dirname, '..', 'src/src/infra/db/postgres/migrations/**/*.js')],
  cli: {
    migrationsDir: 'src/infra/db/postgres/migrations'
  }
}
