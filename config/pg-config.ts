import { ConnectionOptions } from 'typeorm'

console.log("output", process.env.POSTGRES_DATABASE)

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
  migrations: ['src/infra/db/postgres/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/infra/db/postgres/migrations'
  }
}
