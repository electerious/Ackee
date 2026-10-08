import server from './server.js'
import config from './utils/config.js'
import connect from './utils/connect.js'
import signale from './utils/signale.js'
import stripUrlAuth from './utils/strip-url-auth.js'

if (config.dbUrl == null) {
  signale.fatal('MongoDB connection URI missing in environment')
  process.exit(1)
}

server.on('listening', () => signale.watch(`Listening on http://localhost:${config.port}`))
server.on('error', (error) => signale.fatal(error))

signale.await(`Connecting to ${stripUrlAuth(config.dbUrl)}`)

connect(config.dbUrl)
  .then(() => {
    signale.success(`Connected to ${stripUrlAuth(config.dbUrl)}`)
    signale.start(`Starting the server`)

    server.listen(config.port)

    if (config.isDevelopmentMode === true) {
      signale.info('Development mode enabled')
    }

    if (config.isDemoMode === true) {
      signale.info('Demo mode enabled')
    }
  })
  .catch((error) => {
    signale.fatal(error)
    process.exit(1)
  })
