import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@as-integrations/express5'
import express from 'express'
import helmet from 'helmet'
import { readFile } from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'

import config from './utils/config.js'
import createApolloServer from './utils/createApolloServer.js'
import { createExpressContext } from './utils/createContext.js'
import * as customTracker from './utils/customTracker.js'
import findMatchingOrigin from './utils/findMatchingOrigin.js'
import KnownError from './utils/KnownError.js'
import signale from './utils/signale.js'

const __dirname = import.meta.dirname

const loadFile = (filename) => readFile(path.resolve(__dirname, '../dist', filename)).catch(signale.fatal)

const index = loadFile('index.html')
const favicon = loadFile('favicon.ico')
const styles = loadFile('index.css')
const scripts = loadFile('index.js')
const tracker = loadFile('tracker.js')

const handleGraphError = (formattedError, error) => {
  // This part is for error that happen inside GraphQL resolvers.
  // All known errors should be thrown as a KnownError as those
  // errors will only show up in the response and as a warning
  // in the console output.

  const suitableError = error.originalError || error
  const isKnownError = suitableError instanceof KnownError

  // Only log the full error stack when the error isn't a known response
  if (isKnownError === false) {
    signale.fatal(suitableError)
    return formattedError
  }

  signale.warn(suitableError.message)
  return formattedError
}

const attachCorsHeaders = async (request, response, next) => {
  const matchingOrigin = await findMatchingOrigin(request.headers.origin, config.allowOrigin, config.autoOrigin)

  if (matchingOrigin != null) {
    response.setHeader('Access-Control-Allow-Origin', matchingOrigin)
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Time-Zone')
    response.setHeader('Access-Control-Allow-Credentials', 'true')
    response.setHeader('Access-Control-Max-Age', '3600')
  }

  next()
}

const app = express()

// Disable the X-Powered-By header and set other security headers
app.use(
  helmet({
    // Allow the tracker and UI assets to be loaded cross-origin
    crossOriginResourcePolicy: false,
    // The generated UI contains an inline configuration script.
    contentSecurityPolicy: false,
  }),
)

// Create HTTP server before Apollo Server (needed for drain plugin)
const server = http.createServer(app)

const apolloServer = createApolloServer({
  formatError: handleGraphError,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer: server })], // eslint-disable-line new-cap
})

// Apply CORS middleware
app.use(attachCorsHeaders)

// Respond to preflight requests
app.options('/{*path}', (request, response) => {
  response.sendStatus(204)
})

// Serve static files
app.get('/', async (request, response) => {
  response.setHeader('Content-Type', 'text/html; charset=utf-8')
  response.end(await index)
})

app.get('/index.html', async (request, response) => {
  response.setHeader('Content-Type', 'text/html; charset=utf-8')
  response.end(await index)
})

app.get('/favicon.ico', async (request, response) => {
  response.setHeader('Content-Type', 'image/vnd.microsoft.icon')
  response.end(await favicon)
})

app.get('/index.css', async (request, response) => {
  response.setHeader('Content-Type', 'text/css; charset=utf-8')
  response.end(await styles)
})

app.get('/index.js', async (request, response) => {
  response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
  response.end(await scripts)
})

app.get('/tracker.js', async (request, response) => {
  response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
  response.end(await tracker)
})

if (customTracker.exists === true) {
  app.get(customTracker.url, async (request, response) => {
    response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
    response.end(await tracker)
  })
}

// Start Apollo Server and apply middleware
await apolloServer.start()
app.use(
  '/api',
  express.json(),
  expressMiddleware(apolloServer, {
    context: createExpressContext,
  }),
)

// Handle 404 errors for unmatched routes (must be after Apollo middleware)
app.use((request, response) => {
  signale.warn(`\`${request.url}\` not found`)
  response.status(404).send('Not found')
})

export default server
