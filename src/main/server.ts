import 'reflect-metadata'
import path from 'path';
import dotenv from 'dotenv'; dotenv.config({ path: path.join(__dirname, '..', '..', '.env') })
import { createConnection } from 'typeorm'
import { config } from '../../config/pg-config'



console.log("começo", process.env.POSTGRES_PASSWORD)

createConnection(config).then(async (connection) => {


  connection.runMigrations()


  const app = (await import('./config/app')).default
  app.listen(3000, () => {

  }
  )
}
)
