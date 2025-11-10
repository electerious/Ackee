'use strict'

const http = require('http')
const express = require('express')
const { resolve } = require('path')
const { readFile } = require('fs').promises
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')

const KnownError = require('./utils/KnownError')
const signale = require('./utils/signale')
const config = require('./utils/config')
const findMatchingOrigin = require('./utils/findMatchingOrigin')
const customTracker = require('./utils/customTracker')
const createApolloServer = require('./utils/createApolloServer')
const { createExpressContext } = require('./utils/createContext')

const index = readFile(resolve(__dirname, '../dist/index.html')).catch(signale.fatal)
const favicon = readFile(resolve(__dirname, '../dist/favicon.ico')).catch(signale.fatal)
const styles = readFile(resolve(__dirname, '../dist/index.css')).catch(signale.fatal)
const scripts = readFile(resolve(__dirname, '../dist/index.js')).catch(signale.fatal)
const tracker = readFile(resolve(__dirname, '../dist/tracker.js')).catch(signale.fatal)

const handleGraphError = (error) => {
	// This part is for error that happen inside GraphQL resolvers.
	// All known errors should be thrown as a KnownError as those
	// errors will only show up in the response and as a warning
	// in the console output.

	const suitableError = error.originalError || error
	const isKnownError = suitableError instanceof KnownError

	// Only log the full error stack when the error isn't a known response
	if (isKnownError === false) {
		signale.fatal(suitableError)
		return error
	}

	signale.warn(suitableError.message)
	return error
}

const app = express()

// CORS middleware
app.use(async (request, response, next) => {
	const matchingOrigin = await findMatchingOrigin(request, config.allowOrigin, config.autoOrigin)

	if (matchingOrigin != null) {
		response.setHeader('Access-Control-Allow-Origin', matchingOrigin)
		response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS')
		response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Time-Zone')
		response.setHeader('Access-Control-Allow-Credentials', 'true')
		response.setHeader('Access-Control-Max-Age', '3600')
	}

	if (request.method === 'OPTIONS') {
		return response.sendStatus(200)
	}

	next()
})

// Static file routes
app.get('/', async (request, response) => {
	response.setHeader('Content-Type', 'text/html; charset=utf-8')
	response.send(await index)
})

app.get('/index.html', async (request, response) => {
	response.setHeader('Content-Type', 'text/html; charset=utf-8')
	response.send(await index)
})

app.get('/favicon.ico', async (request, response) => {
	response.setHeader('Content-Type', 'image/vnd.microsoft.icon')
	response.send(await favicon)
})

app.get('/index.css', async (request, response) => {
	response.setHeader('Content-Type', 'text/css; charset=utf-8')
	response.send(await styles)
})

app.get('/index.js', async (request, response) => {
	response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
	response.send(await scripts)
})

app.get('/tracker.js', async (request, response) => {
	response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
	response.send(await tracker)
})

if (customTracker.exists === true) {
	app.get(customTracker.url, async (request, response) => {
		response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
		response.send(await tracker)
	})
}

// Apollo Server setup
const apolloServer = createApolloServer(ApolloServer, {
	formatError: handleGraphError,
})

// Start Apollo Server asynchronously
const apolloServerStarted = apolloServer.start()
	.then(() => {
		signale.success('Apollo Server started')
	})
	.catch((error) => {
		signale.fatal('Failed to start Apollo Server:', error)
		process.exit(1)
	})

// GraphQL endpoint - wait for server to start before processing
app.use('/api', express.json(), async (request, response, next) => {
	// Ensure Apollo Server is started
	await apolloServerStarted
	// Call expressMiddleware after server is started
	return expressMiddleware(apolloServer, {
		context: createExpressContext,
	})(request, response, next)
})

// Health check endpoint
app.get('/.well-known/apollo/server-health', (request, response) => {
	response.status(200).json({ status: 'pass' })
})

// 404 handler - must be after all other routes
app.use((request, response) => {
	signale.warn(`\`${ request.url }\` not found`)
	response.status(404).send('Not found')
})

// Error handler - must be last
app.use((error, request, response) => {
	const isUnknownError = error.statusCode == null
	const hasOriginalError = error.originalError != null

	// Only log the full error stack when the error isn't a known response
	if (isUnknownError === true) {
		signale.fatal(error)
		return response.status(500).send(error.message)
	}

	signale.warn(hasOriginalError === true ? error.originalError.message : error.message)
	response.status(error.statusCode).send(error.message)
})

// Create HTTP server
const server = http.createServer(app)

module.exports = server