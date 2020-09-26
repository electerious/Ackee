'use strict'

const mongoose = require('mongoose')
const { ApolloServer } = require('apollo-server-lambda')
const { UnsignedIntResolver, UnsignedIntTypeDefinition, DateTimeResolver, DateTimeTypeDefinition } = require('graphql-scalars')

const isAuthenticated = require('../src/utils/isAuthenticated')
const isDemoMode = require('../src/utils/isDemoMode')
const isDevelopmentMode = require('../src/utils/isDevelopmentMode')
const createDate = require('../src/utils/createDate')

const dbUrl = process.env.ACKEE_MONGODB || process.env.MONGODB_URI

if (dbUrl == null) {
	throw new Error('MongoDB connection URI missing in environment')
}

mongoose.connect(dbUrl, {
	useFindAndModify: false,
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
})

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
	context: async (integrationContext) => ({
		isDemoMode,
		isAuthenticated: await isAuthenticated(integrationContext.event.headers['authorization']),
		dateDetails: createDate(integrationContext.event.headers['time-zone']),
		req: integrationContext.req
	})
})

exports.handler = apolloServer.createHandler()