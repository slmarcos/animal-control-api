import 'module-alias/register'
import env from '@/main/configs/env'
import app from '@/main/configs/app'
import { MongoHelper } from '@/infra/db/helpers'

import http from 'http'

const port = env.port
const server = http.createServer(app)

const onListening = (): void => {
  console.log(`[${new Date().toISOString()}]`, `Server running on port: ${env.port}`)
}

const onError = (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== 'listen') {
    throw error
  }
  switch (error.code) {
    case 'EACCES':
      console.error(`${port} requires elevated privileges`)
      process.exit(1)
    case 'EADDRINUSE':
      console.error(`${port} is already in use`)
      process.exit(1)
    default:
      throw error
  }
}

server.on('listening', onListening)
server.on('error', onError)

MongoHelper.connect(env.mongoUrl!)
  .then(() => server.listen(port))
  .catch((err) => console.error(err))
