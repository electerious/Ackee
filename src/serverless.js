'use strict'

const { ApolloServer } = require('@apollo/server')
const { startServerAndCreateLambdaHandler, handlers } = require('@as-integrations/aws-lambda')

const config = require('./utils/config')
const connect = require('./utils/connect')
const fullyQualifiedDomainNames = require('./utils/fullyQualifiedDomainNames')
const createApolloServer = require('./utils/createApolloServer')
const { createServerlessContext } = require('./utils/createContext')

if (config.dbUrl == null) {
	throw new Error('MongoDB connection URI missing in environment')
}

connect(config.dbUrl)

const apolloServer = createApolloServer(ApolloServer, {})

const getCorsOrigin = async () => {
	if (config.autoOrigin === true) {
		const names = await fullyQualifiedDomainNames()
		return names.flatMap((name) => [ `http://${ name }`, `https://${ name }`, name ])
	}

	if (config.allowOrigin === '*') {
		return '*'
	}

	if (config.allowOrigin != null) {
		return config.allowOrigin.split(',')
	}

	return []
}

// Cache CORS origins for better performance
let corsOriginsPromise = null
const getCachedCorsOrigins = () => {
	if (corsOriginsPromise == null) {
		corsOriginsPromise = getCorsOrigin()
	}
	return corsOriginsPromise
}

exports.handler = startServerAndCreateLambdaHandler(
	apolloServer,
	handlers.createAPIGatewayProxyEventV2RequestHandler(),
	{
		context: createServerlessContext,
		middleware: [
			async (event) => {
				// Add CORS headers to the response
				const allowedOrigins = await getCachedCorsOrigins()
				const requestOrigin = event.headers?.origin || event.headers?.Origin

				return (result) => { // eslint-disable-line require-await
					const headers = result.headers || {}

					if (allowedOrigins === '*') {
						headers['Access-Control-Allow-Origin'] = '*'
					} else if (Array.isArray(allowedOrigins) && requestOrigin && allowedOrigins.includes(requestOrigin)) {
						headers['Access-Control-Allow-Origin'] = requestOrigin
					}

					if (headers['Access-Control-Allow-Origin']) {
						headers['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, OPTIONS'
						headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, Time-Zone'
						headers['Access-Control-Allow-Credentials'] = 'true'
						headers['Access-Control-Max-Age'] = '3600'
					}

					return { ...result, headers }
				}
			},
		],
	},
)