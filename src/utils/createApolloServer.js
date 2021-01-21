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

const config = require('./config')

module.exports = (ApolloServer, opts) => new ApolloServer({
	introspection: config.isDemoMode === true || config.isDevelopmentMode === true,
	playground: config.isDemoMode === true || config.isDevelopmentMode === true,
	debug: config.isDevelopmentMode === true,
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