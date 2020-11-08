'use strict'

const { ApolloServer } = require('apollo-server-lambda')

const connect = require('./utils/connect')
const createApolloServer = require('./utils/createApolloServer')
const { createMicroContext } = require('./utils/createContext')

const allowOrigin = process.env.ACKEE_ALLOW_ORIGIN || ''
const dbUrl = process.env.ACKEE_MONGODB || process.env.MONGODB_URI

if (dbUrl == null) {
	throw new Error('MongoDB connection URI missing in environment')
}

connect(dbUrl)

const apolloServer = createApolloServer(ApolloServer, {
	context: createMicroContext
})

exports.handler = apolloServer.createHandler({
	cors: {
		origin: allowOrigin === '*' ? true : allowOrigin.split(','),
		methods: 'GET,POST,PATCH,OPTIONS',
		allowedHeaders: 'Content-Type'
	}
})