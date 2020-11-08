'use strict'

const { UnsignedIntResolver, UnsignedIntTypeDefinition, DateTimeResolver, DateTimeTypeDefinition } = require('graphql-scalars')

const isDemoMode = require('./isDemoMode')
const isDevelopmentMode = require('./isDevelopmentMode')

module.exports = (ApolloServer, opts) => new ApolloServer({
	introspection: isDemoMode === true || isDevelopmentMode === true,
	playground: isDemoMode === true || isDevelopmentMode === true,
	debug: isDevelopmentMode === true,
	typeDefs: [
		UnsignedIntTypeDefinition,
		DateTimeTypeDefinition,
		require('../types')
	],
	resolvers: {
		UnsignedInt: UnsignedIntResolver,
		DateTime: DateTimeResolver,
		...require('../resolvers')
	},
	...opts
})