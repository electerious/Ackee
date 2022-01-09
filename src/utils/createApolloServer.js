'use strict'

const {
	ApolloServerPluginLandingPageGraphQLPlayground: apolloServerPluginLandingPageGraphQLPlayground,
	ApolloServerPluginLandingPageDisabled: apolloServerPluginLandingPageDisabled,
} = require('apollo-server-core')
const httpHeadersPlugin = require('apollo-server-plugin-http-headers')
const {
	UnsignedIntResolver,
	UnsignedIntTypeDefinition,
	DateTimeResolver,
	DateTimeTypeDefinition,
	PositiveFloatResolver,
	PositiveFloatTypeDefinition,
} = require('graphql-scalars')

const config = require('./config')

module.exports = (ApolloServer, options) => new ApolloServer({
	introspection: config.isDemoMode === true || config.isDevelopmentMode === true,
	playground: config.isDemoMode === true || config.isDevelopmentMode === true,
	debug: config.isDevelopmentMode === true,
	plugins: [
		httpHeadersPlugin,
		(config.isDemoMode === true || config.isDevelopmentMode === true) ?
			apolloServerPluginLandingPageGraphQLPlayground() :
			apolloServerPluginLandingPageDisabled(),
	],
	typeDefs: [
		UnsignedIntTypeDefinition,
		DateTimeTypeDefinition,
		PositiveFloatTypeDefinition,
		require('../types'),
	],
	resolvers: {
		UnsignedInt: UnsignedIntResolver,
		DateTime: DateTimeResolver,
		PositiveFloat: PositiveFloatResolver,
		...require('../resolvers'),
	},
	...options,
})