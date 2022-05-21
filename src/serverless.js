'use strict'

const { ApolloServer } = require('apollo-server-lambda')

const config = require('./utils/config')
const connect = require('./utils/connect')
const fullyQualifiedDomainNames = require('./utils/fullyQualifiedDomainNames')
const createApolloServer = require('./utils/createApolloServer')
const { createServerlessContext } = require('./utils/createContext')

if (config.dbUrl == null) {
	throw new Error('MongoDB connection URI missing in environment')
}

connect(config.dbUrl)

const apolloServer = createApolloServer(ApolloServer, {
	context: createServerlessContext,
})

const origin = (origin, callback) => {
	if (config.autoOrigin === true) {
		fullyQualifiedDomainNames()
			.then((names) => callback(
				null,
				names.flatMap((name) => [ `http://${ name }`, `https://${ name }`, name ]),
			))
			.catch((error) => callback(error, false))
		return
	}

	if (config.allowOrigin === '*') {
		callback(null, true)
		return
	}

	if (config.allowOrigin != null) {
		callback(null, config.allowOrigin.split(','))
		return
	}

	callback(null, false)
	return
}

exports.handler = (event, context) => {
	// Set request context which is missing on Vercel:
	// https://stackoverflow.com/questions/71360059/apollo-server-lambda-unable-to-determine-event-source-based-on-event
	if (event.requestContext == null) event.requestContext = context

	const handler = apolloServer.createHandler({
		expressGetMiddlewareOptions: {
			cors: {
				origin,
				credentials: true,
				methods: 'GET,POST,PATCH,OPTIONS',
				allowedHeaders: 'Content-Type, Authorization, Time-Zone',
			},
		},
	})

	return handler(event, context)
}