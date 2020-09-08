'use strict'

const { ApolloServer } = require('apollo-server-lambda')
const { UnsignedIntResolver, UnsignedIntTypeDefinition, DateTimeResolver, DateTimeTypeDefinition } = require('graphql-scalars')

const isAuthenticated = require('./utils/isAuthenticated')
const isDemoMode = require('./utils/isDemoMode')
const isDevelopmentMode = require('./utils/isDevelopmentMode')
const createDate = require('./utils/createDate')

const apolloServer = new ApolloServer({
	introspection: isDemoMode === true || isDevelopmentMode === true,
	playground: isDemoMode === true || isDevelopmentMode === true,
	debug: isDevelopmentMode === true,
	// formatError: handleGraphError,
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

exports.handler = apolloServer.createHandler()