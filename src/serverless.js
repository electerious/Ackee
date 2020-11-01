'use strict'

const { ApolloServer } = require('apollo-server-lambda')
const { UnsignedIntResolver, UnsignedIntTypeDefinition, DateTimeResolver, DateTimeTypeDefinition } = require('graphql-scalars')

const connect = require('./utils/connect')
const isDemoMode = require('./utils/isDemoMode')
const isDevelopmentMode = require('./utils/isDevelopmentMode')
const { createServerlessContext } = require('./utils/createContext')

const allowOrigin = process.env.ACKEE_ALLOW_ORIGIN || ''
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
		require('./types')
	],
	resolvers: {
		UnsignedInt: UnsignedIntResolver,
		DateTime: DateTimeResolver,
		...require('./resolvers')
	},
	context: createServerlessContext
})

exports.handler = apolloServer.createHandler({
	cors: {
		origin: allowOrigin === '*' ? true : allowOrigin.split(','),
		methods: 'GET,POST,PATCH,OPTIONS',
		allowedHeaders: 'Content-Type'
	}
})