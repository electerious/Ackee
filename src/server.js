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

const handleMicroError = (err, res) => {

	// This part is for micro errors and errors outside of GraphQL.
	// Most errors won't be caught here, but some error can still
	// happen outside of GraphQL. In this case we distinguish
	// between unknown errors and known errors. Known errors are
	// created with the createError function while unknown errors
	// are simply errors thrown somewhere in the application.

	const isUnknownError = err.statusCode == null
	const hasOriginalError = err.originalError != null

	// Only log the full error stack when the error isn't a known response
	if (isUnknownError === true) {
		signale.fatal(err)
		return send(res, 500, err.message)
	}

	signale.warn(hasOriginalError === true ? err.originalError.message : err.message)
	send(res, err.statusCode, err.message)

}

const handleGraphError = (err) => {

	// This part is for error that happen inside GraphQL resolvers.
	// All known errors should be thrown as a KnownError as those
	// errors will only show up in the response and as a warning
	// in the console output.

	const suitableError = err.originalError || err
	const isKnownError = suitableError instanceof KnownError

	// Only log the full error stack when the error isn't a known response
	if (isKnownError === false) {
		signale.fatal(suitableError)
		return err
	}

	signale.warn(suitableError.message)
	return err

}

const catchError = (fn) => async (req, res) => {

	try {
		return await fn(req, res)
	} catch (err) {
		handleMicroError(err, res)
	}

}

const attachCorsHeaders = (fn) => async (req, res) => {

	const matchingOrigin = findMatchingOrigin(req, config.allowOrigin)

	if (matchingOrigin != null) {
		res.setHeader('Access-Control-Allow-Origin', matchingOrigin)
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS')
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Time-Zone')
		res.setHeader('Access-Control-Allow-Credentials', 'true')
	}

	return fn(req, res)

}

const notFound = async (req) => {

	const err = new Error(`\`${ req.url }\` not found`)

	throw createError(404, 'Not found', err)

}

const apolloServer = createApolloServer(ApolloServer, {
	formatError: handleGraphError,
	context: createMicroContext
})

const graphqlPath = '/api'
const graphqlHandler = apolloServer.createHandler({ path: graphqlPath })

const routes = [

	get('/', async (req, res) => {
		res.setHeader('Content-Type', 'text/html; charset=utf-8')
		res.end(await index)
	}),
	get('/index.html', async (req, res) => {
		res.setHeader('Content-Type', 'text/html; charset=utf-8')
		res.end(await index)
	}),
	get('/favicon.ico', async (req, res) => {
		res.setHeader('Content-Type', 'image/vnd.microsoft.icon')
		res.end(await favicon)
	}),
	get('/index.css', async (req, res) => {
		res.setHeader('Content-Type', 'text/css; charset=utf-8')
		res.end(await styles)
	}),
	get('/index.js', async (req, res) => {
		res.setHeader('Content-Type', 'text/javascript; charset=utf-8')
		res.end(await scripts)
	}),
	get('/tracker.js', async (req, res) => {
		res.setHeader('Content-Type', 'text/javascript; charset=utf-8')
		res.end(await tracker)
	}),
	customTracker.exists === true ? get(customTracker.url, async (req, res) => {
		res.setHeader('Content-Type', 'text/javascript; charset=utf-8')
		res.end(await tracker)
	}) : undefined,

	post(graphqlPath, graphqlHandler),
	get(graphqlPath, graphqlHandler),
	get('/.well-known/apollo/server-health', graphqlHandler),

	get('/*', notFound),
	post('/*', notFound),
	put('/*', notFound),
	patch('/*', notFound),
	del('/*', notFound)

].filter(Boolean)

module.exports = micro(
	attachCorsHeaders(
		catchError(
			router(...routes)
		)
	)
)