'use strict'

const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')

const Token = require('../../src/models/Token')
const Domain = require('../../src/models/Domain')
const Record = require('../../src/models/Record')
const connect = require('../../src/utils/connect')
const createArray = require('../../src/utils/createArray')
const { day } = require('../../src/utils/times')

const mongoDb = new MongoMemoryServer()

const connectToDatabase = async () => {
	const dbUrl = await mongoDb.getUri()
	return connect(dbUrl)
}

const fillDatabase = async (t) => {
	// Saves to context so tests can access IDs
	t.context.token = await Token.create({})
	t.context.domain = await Domain.create({ title: 'example.com' })
	t.context.factsDomain = await Domain.create({ title: 'facts.example.com' })

	const now = Date.now()

	const records = createArray(14).map((item, i) => ({
		clientId: `client-${ i }`,
		domainId: t.context.factsDomain.id,
		siteLocation: 'https://facts.example.com/',
		siteReferrer: 'https://google.com/',
		siteLanguage: 'en',
		screenWidth: 414,
		screenHeight: 896,
		screenColorDepth: 32,
		deviceName: 'iPhone',
		deviceManufacturer: 'Apple',
		osName: 'iOS',
		osVersion: i > 7 ? '13.0' : '14.0',
		browserName: 'Safari',
		browserVersion: i > 7 ? '13.0' : '14.0',
		browserWidth: 414,
		browserHeight: 719,
		// Add fake 1 minute visit per day
		created: now - i * day - 60 * 1000,
		updated: now - i * day
	}))

	console.log(records[0])

	await Record.insertMany(records)
}

const cleanupDatabase = async (t) => {
	await Token.findOneAndDelete({
		id: t.context.token.id
	})
	await Domain.findOneAndDelete({
		id: t.context.domain.id
	})
	await Domain.findOneAndDelete({
		id: t.context.factsDomain.id
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