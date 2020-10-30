'use strict'

const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')

const Token = require('../../src/models/Token')
const Domain = require('../../src/models/Domain')
const Record = require('../../src/models/Record')
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
	t.context.factsDomain = await Domain.create({ title: 'facts.example.com' })
	const now = Date.now()
	const oneDay = 24 * 60 * 60 * 1000

	// add fake 1 minute visit per day for the last 14 days
	await Promise.all([ ...Array(14).keys() ].map((i) => Record.create({
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
		osVersion: '14.0',
		browserName: 'Safari',
		browserVersion: '14.0',
		browserWidth: 414,
		browserHeight: 719,
		created: now - i * oneDay - 60 * 1000,
		updated: now - i * oneDay
	})))
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