'use strict'

const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')

const Token = require('../../src/models/Token')
const Domain = require('../../src/models/Domain')
const connect = require('../../src/utils/connect')

const mongoDb = new MongoMemoryServer()

const connectToDatabase = async () => {
	const dbUrl = await mongoDb.getUri()
	return connect(dbUrl)
}

const fillDatabase = async (t) => {
	// Saves to context so tests can access IDs
	t.context.token = await Token.create({})
	t.context.domain = await Domain.create({ title: 'example.com' })
}

const cleanupDatabase = async (t) => {
	await Token.findOneAndDelete({
		id: t.context.token.id
	})
	await Domain.findOneAndDelete({
		id: t.context.domain.id
	})
}

const disconnectFromDatabase = async () => {
	mongoose.disconnect()
	mongoDb.stop()
}

module.exports = {
	connectToDatabase,
	fillDatabase,
	cleanupDatabase,
	disconnectFromDatabase
}