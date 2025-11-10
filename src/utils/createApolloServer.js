'use strict'

const {
	ApolloServerPluginLandingPageLocalDefault,
	ApolloServerPluginLandingPageProductionDefault,
} = require('@apollo/server/plugin/landingPage/default')
const httpHeadersPlugin = require('./httpHeadersPlugin')
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
	plugins: [
		httpHeadersPlugin,
		(config.isDemoMode === true || config.isDevelopmentMode === true) ?
			ApolloServerPluginLandingPageLocalDefault({ embed: true }) : // eslint-disable-line new-cap
			ApolloServerPluginLandingPageProductionDefault({ embed: false, graphRef: 'none' }), // eslint-disable-line new-cap
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