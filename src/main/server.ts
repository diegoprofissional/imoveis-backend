import 'reflect-metadata'
import dotenv from 'dotenv'; dotenv.config()
import { createConnection } from 'typeorm'
import { config } from '../../config/pg-config'


createConnection(config).then(async (connection) => {
  const app = (await import('./config/app')).default
  app.listen(3000, () => {

  }
  )
}
)
