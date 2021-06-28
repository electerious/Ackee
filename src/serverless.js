'use strict'

const { ApolloServer } = require('apollo-server-lambda')

const config = require('./utils/config')
const connect = require('./utils/connect')
const domainFqNames = require('./utils/domainFqNames')
const createApolloServer = require('./utils/createApolloServer')
const { createServerlessContext } = require('./utils/createContext')

if (config.dbUrl == null) {
	throw new Error('MongoDB connection URI missing in environment')
}

connect(config.dbUrl)

const apolloServer = createApolloServer(ApolloServer, {
	context: createServerlessContext,
})

const origin = ((req, callback) => {
	if (config.autoOrigin) {
		domainFqNames().then((d) => callback(req, d))
			.catch(() => callback(req, false))
		return
	}

	if (config.allowOrigin === '*') {
		callback(req, true)
		return
	}

	if (config.allowOrigin != null) {
		callback(req, config.allowOrigin.split(','))
		return
	}

	callback(req, false)
	return
})()

exports.handler = apolloServer.createHandler({
	cors: {
		origin,
		credentials: true,
		methods: 'GET,POST,PATCH,OPTIONS',
		allowedHeaders: 'Content-Type, Authorization, Time-Zone',
	},
})