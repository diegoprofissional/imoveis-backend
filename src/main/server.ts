import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { config } from '../../config/pg-config'
import dotenv from 'dotenv'

dotenv.config()

createConnection(config).then(async (connection) => {
  const app = (await import('./config/app')).default
  app.listen(5050, () => {

  }
  )
}
)
