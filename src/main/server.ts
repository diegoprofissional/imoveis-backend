import 'reflect-metadata'
import path from 'path';
import dotenv from 'dotenv'; dotenv.config({ path: path.join(__dirname, '..', '..', '.env') })
import { createConnection } from 'typeorm'
import { config } from '../../config/pg-config'
import https from 'https';
import fs from 'fs'

const privateKey = fs.readFileSync('/etc/letsencrypt/live/imootour.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/imootour.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/imootour.com/chain.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};

createConnection(config).then(async (connection) => {


  connection.runMigrations()


  const app = (await import('./config/app')).default

  const httpsServer = https.createServer(credentials, app);


  httpsServer.listen(3000, () => {

  }
  )
}
)
