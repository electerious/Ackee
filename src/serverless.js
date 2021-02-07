'use strict'

const { ApolloServer } = require('apollo-server-lambda')

const config = require('./utils/config')
const connect = require('./utils/connect')
const createApolloServer = require('./utils/createApolloServer')
const { createServerlessContext } = require('./utils/createContext')

if (config.dbUrl == null) {
	throw new Error('MongoDB connection URI missing in environment')
}

connect(config.dbUrl)

const apolloServer = createApolloServer(ApolloServer, {
	context: createServerlessContext
})

const origin = (() => {
	if (config.allowOrigin === '*') {
		return true
	}

	if (config.allowOrigin != null) {
		return config.allowOrigin.split(',')
	}
})()

exports.handler = apolloServer.createHandler({
	cors: {
		origin,
		credentials: true,
		methods: 'GET,POST,PATCH,OPTIONS',
		allowedHeaders: 'Content-Type, Authorization, Time-Zone'
	}
})