'use strict'

const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const Token = require('../../src/models/Token')
const Domain = require('../../src/models/Domain')
const connect = require('../../src/utils/connect')

// Start MongoDB Instance
const mongod = new MongoMemoryServer()

// Create connection to mongoose before all tests
exports.before = async () =>
	connect(await mongod.getUri())

// Create fixtures before each test
exports.beforeEach = async (t) => {
	// Saves t.context so tests can access IDs
	t.context.token = await Token.create({})
	t.context.domain = await Domain.create({ title: 'example.com' })
}

// Clean up database after every test
exports.afterEach = async (t) => {
	await Token.findOneAndDelete({
		id: t.context.token.id
	})
	await Domain.findOneAndDelete({
		id: t.context.domain.id
	})
}

// Disconnect MongoDB and mongoose after all tests are done
exports.after = async () => {
	mongoose.disconnect()
	mongod.stop()
}