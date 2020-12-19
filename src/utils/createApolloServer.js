'use strict'

const httpHeadersPlugin = require('apollo-server-plugin-http-headers')
const {
	UnsignedIntResolver,
	UnsignedIntTypeDefinition,
	DateTimeResolver,
	DateTimeTypeDefinition,
	PositiveFloatResolver,
	PositiveFloatTypeDefinition
} = require('graphql-scalars')

const isDemoMode = require('./isDemoMode')
const isDevelopmentMode = require('./isDevelopmentMode')

module.exports = (ApolloServer, opts) => new ApolloServer({
	introspection: isDemoMode === true || isDevelopmentMode === true,
	playground: isDemoMode === true || isDevelopmentMode === true,
	debug: isDevelopmentMode === true,
	plugins: [
		httpHeadersPlugin
	],
	typeDefs: [
		UnsignedIntTypeDefinition,
		DateTimeTypeDefinition,
		PositiveFloatTypeDefinition,
		require('../types')
	],
	resolvers: {
		UnsignedInt: UnsignedIntResolver,
		DateTime: DateTimeResolver,
		PositiveFloat: PositiveFloatResolver,
		...require('../resolvers')
	},
	...opts
})