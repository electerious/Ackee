'use strict'

const micro = require('micro')
const { resolve } = require('path')
const { readFile } = require('fs').promises
const { send, createError } = require('micro')
const { router, get, post, put, patch, del } = require('microrouter')
const { ApolloServer } = require('apollo-server-micro')

const KnownError = require('./utils/KnownError')
const signale = require('./utils/signale')
const config = require('./utils/config')
const findMatchingOrigin = require('./utils/findMatchingOrigin')
const customTracker = require('./utils/customTracker')
const createApolloServer = require('./utils/createApolloServer')
const { createMicroContext } = require('./utils/createContext')

const index = readFile(resolve(__dirname, '../dist/index.html')).catch(signale.fatal)
const favicon = readFile(resolve(__dirname, '../dist/favicon.ico')).catch(signale.fatal)
const styles = readFile(resolve(__dirname, '../dist/index.css')).catch(signale.fatal)
const scripts = readFile(resolve(__dirname, '../dist/index.js')).catch(signale.fatal)
const tracker = readFile(resolve(__dirname, '../dist/tracker.js')).catch(signale.fatal)

const handleMicroError = (error, response) => {
	// This part is for micro errors and errors outside of GraphQL.
	// Most errors won't be caught here, but some error can still
	// happen outside of GraphQL. In this case we distinguish
	// between unknown errors and known errors. Known errors are
	// created with the createError function while unknown errors
	// are simply errors thrown somewhere in the application.

	const isUnknownError = error.statusCode == null
	const hasOriginalError = error.originalError != null

	// Only log the full error stack when the error isn't a known response
	if (isUnknownError === true) {
		signale.fatal(error)
		return send(response, 500, error.message)
	}

	signale.warn(hasOriginalError === true ? error.originalError.message : error.message)
	send(response, error.statusCode, error.message)
}

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

const catchError = (fn) => async (request, response) => {
	try {
		return await fn(request, response)
	} catch (error) {
		handleMicroError(error, response)
	}
}

const attachCorsHeaders = (fn) => async (request, response) => {
	const matchingOrigin = await findMatchingOrigin(request, config.allowOrigin, config.autoOrigin)

	if (matchingOrigin != null) {
		response.setHeader('Access-Control-Allow-Origin', matchingOrigin)
		response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS')
		response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Time-Zone')
		response.setHeader('Access-Control-Allow-Credentials', 'true')
		response.setHeader('Access-Control-Max-Age', '3600')
	}

	return fn(request, response)
}

const awaitedHandler = (fn) => async (request, response) => {
	return (await fn)(request, response)
}

const notFound = (request) => {
	const error = new Error(`\`${ request.url }\` not found`)

	throw createError(404, 'Not found', error)
}

const apolloServer = createApolloServer(ApolloServer, {
	formatError: handleGraphError,
	context: createMicroContext,
})

const graphqlPath = '/api'
const apolloHandler = apolloServer
	.start()
	.then(() => apolloServer.createHandler({ path: graphqlPath }))

const routes = [

	get('/', async (request, response) => {
		response.setHeader('Content-Type', 'text/html; charset=utf-8')
		response.end(await index)
	}),
	get('/index.html', async (request, response) => {
		response.setHeader('Content-Type', 'text/html; charset=utf-8')
		response.end(await index)
	}),
	get('/favicon.ico', async (request, response) => {
		response.setHeader('Content-Type', 'image/vnd.microsoft.icon')
		response.end(await favicon)
	}),
	get('/index.css', async (request, response) => {
		response.setHeader('Content-Type', 'text/css; charset=utf-8')
		response.end(await styles)
	}),
	get('/index.js', async (request, response) => {
		response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
		response.end(await scripts)
	}),
	get('/tracker.js', async (request, response) => {
		response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
		response.end(await tracker)
	}),
	customTracker.exists === true ? get(customTracker.url, async (request, response) => {
		response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
		response.end(await tracker)
	}) : undefined,

	post(graphqlPath, awaitedHandler(apolloHandler)),
	get(graphqlPath, awaitedHandler(apolloHandler)),
	get('/.well-known/apollo/server-health', awaitedHandler(apolloHandler)),

	get('/*', notFound),
	post('/*', notFound),
	put('/*', notFound),
	patch('/*', notFound),
	del('/*', notFound),

].filter(Boolean)

module.exports = micro(
	attachCorsHeaders(
		catchError(
			router(...routes),
		),
	),
)