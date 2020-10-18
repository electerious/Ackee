'use strict'

const { ApolloServer } = require('apollo-server-lambda')
const { UnsignedIntResolver, UnsignedIntTypeDefinition, DateTimeResolver, DateTimeTypeDefinition } = require('graphql-scalars')

const connect = require('../src/utils/connect')
const isDemoMode = require('../src/utils/isDemoMode')
const isDevelopmentMode = require('../src/utils/isDevelopmentMode')
const { createServerlessContext } = require('../src/utils/createContext')

const dbUrl = process.env.ACKEE_MONGODB || process.env.MONGODB_URI

if (dbUrl == null) {
	throw new Error('MongoDB connection URI missing in environment')
}

connect(dbUrl)

const apolloServer = new ApolloServer({
	introspection: isDemoMode === true || isDevelopmentMode === true,
	playground: isDemoMode === true || isDevelopmentMode === true,
	debug: isDevelopmentMode === true,
	typeDefs: [
		UnsignedIntTypeDefinition,
		DateTimeTypeDefinition,
		require('../src/types')
	],
	resolvers: {
		UnsignedInt: UnsignedIntResolver,
		DateTime: DateTimeResolver,
		...require('../src/resolvers')
	},
	context: createServerlessContext
})

exports.handler = apolloServer.createHandler()