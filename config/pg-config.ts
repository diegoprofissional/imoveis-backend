import { ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '23@!shhFTP',
  database: 'imoveis_tdd',
  entities: ['src/infra/db/postgres/models/index.ts'],
  synchronize: false,
  logging: true,
  migrations: ['src/infra/db/postgres/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/infra/db/postgres/migrations'
  }
}
