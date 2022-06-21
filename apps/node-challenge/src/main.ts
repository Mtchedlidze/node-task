import * as express from 'express'
import './app/database/data.source'
import router from './app/routes'
import { json } from 'body-parser'
import * as cookieParser from 'cookie-parser'

const app = express()
app.use(json(), cookieParser())
const port = process.env.port || 3333

app.use('*', (req, res) => {
  res.status(404).send(`required path ${req.url} not found`)
})
app.use('api', router)

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`)
})
server.on('error', console.error)
