import express from 'express'
import setupMiddlewares from './middlewares'
import routes from './routes'
import 'reflect-metadata'
import path from 'path'
const app = express()

app.use(express.static('/var/www/publico'));

setupMiddlewares(app)
routes(app)

export default app
