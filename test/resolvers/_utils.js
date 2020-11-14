'use strict'

const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const fetch = require('node-fetch')

const Token = require('../../src/models/Token')
const Domain = require('../../src/models/Domain')
const Record = require('../../src/models/Record')
const connect = require('../../src/utils/connect')
const createArray = require('../../src/utils/createArray')
const { day, minute } = require('../../src/utils/times')

const mongoDb = new MongoMemoryServer()

const connectToDatabase = async () => {
	const dbUrl = await mongoDb.getUri()
	return connect(dbUrl)
}

const fillDatabase = async (t) => {
	// Saves to context so tests can access IDs
	t.context.token = await Token.create({})
	t.context.domain = await Domain.create({ title: 'Example' })

	const now = Date.now()

	const records = createArray(14).map((item, i) => ({
		clientId: `client-${ i }`,
		domainId: t.context.domain.id,
		siteLocation: 'https://example.com/',
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
		// Add fake minute visit per day
		created: now - i * day - minute,
		updated: now - i * day
	}))

	await Record.insertMany(records)
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

const api = async (base, body, token, headers = {}) => {
	const url = new URL('/api', await base)

	const defaultHeaders = {}
	defaultHeaders['Content-Type'] = 'application/json'
	defaultHeaders['Authorization'] = token == null ? undefined : `Bearer ${ token }`

	const res = await fetch(url.href, {
		method: 'post',
		body: JSON.stringify(body),
		headers: {
			...defaultHeaders,
			...headers
		}
	})

	return {
		headers: res.headers,
		json: await res.json()
	}
}

module.exports = {
	connectToDatabase,
	fillDatabase,
	cleanupDatabase,
	disconnectFromDatabase,
	api
}