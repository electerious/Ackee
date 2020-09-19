'use strict'

const { ApolloServer } = require('apollo-server-micro')
const { UnsignedIntResolver, UnsignedIntTypeDefinition, DateTimeResolver, DateTimeTypeDefinition } = require('graphql-scalars')
const micro = require('micro')
const { send, createError } = require('micro')
const { router, get, post, put, patch, del } = require('microrouter')

const KnownError = require('./utils/KnownError')
const signale = require('./utils/signale')
const isDefined = require('./utils/isDefined')
const isAuthenticated = require('./utils/isAuthenticated')
const isDemoMode = require('./utils/isDemoMode')
const isDevelopmentMode = require('./utils/isDevelopmentMode')
const customTrackerUrl = require('./utils/customTrackerUrl')
const createDate = require('./utils/createDate')
const ui = require('./routes/ui')

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

	const originalError = err.originalError
	const isKnownError = originalError instanceof KnownError

	// Only log the full error stack when the error isn't a known response
	if (isKnownError === false) {
		signale.fatal(originalError)
		return err
	}

	signale.warn(err.originalError.message)
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

	const allowOrigin = (() => {

		if (process.env.ACKEE_ALLOW_ORIGIN === '*') return '*'

		if (process.env.ACKEE_ALLOW_ORIGIN) {
			const origins = process.env.ACKEE_ALLOW_ORIGIN.split(',')
			return origins.find((origin) => origin.includes(req.headers.origin) || origin.includes(req.headers.host))
		}

	})()

	if (allowOrigin != null) {
		res.setHeader('Access-Control-Allow-Origin', allowOrigin)
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS')
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
	}

	return fn(req, res)

}

const notFound = async (req) => {

	const err = new Error(`\`${ req.url }\` not found`)

	throw createError(404, 'Not found', err)

}

const apolloServer = new ApolloServer({
	introspection: isDemoMode === true || isDevelopmentMode === true,
	playground: isDemoMode === true || isDevelopmentMode === true,
	debug: isDevelopmentMode === true,
	formatError: handleGraphError,
	typeDefs: [
		UnsignedIntTypeDefinition,
		DateTimeTypeDefinition,
		require('./types')
	],
	resolvers: {
		UnsignedInt: UnsignedIntResolver,
		DateTime: DateTimeResolver,
		...require('./resolvers')
	},
	context: async (integrationContext) => ({
		isDemoMode,
		isAuthenticated: await isAuthenticated(integrationContext.req),
		dateDetails: createDate(integrationContext.req.headers['time-zone']),
		req: integrationContext.req
	})
})

const graphqlPath = '/api'
const graphqlHandler = apolloServer.createHandler({ path: graphqlPath })

const routes = [

	get('/', ui.index),
	get('/index.html', ui.index),
	get('/favicon.ico', ui.favicon),
	get('/index.css', ui.styles),
	get('/index.js', ui.scripts),
	get('/tracker.js', ui.tracker),
	customTrackerUrl != null ? get(customTrackerUrl, ui.tracker) : undefined,

	post(graphqlPath, graphqlHandler),
	get(graphqlPath, graphqlHandler),

	get('/*', notFound),
	post('/*', notFound),
	put('/*', notFound),
	patch('/*', notFound),
	del('/*', notFound)

].filter(isDefined)

module.exports = micro(
	attachCorsHeaders(
		catchError(
			router(...routes)
		)
	)
)