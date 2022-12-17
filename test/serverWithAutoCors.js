'use strict'

const test = require('ava')
const listen = require('test-listen')
const fetch = require('node-fetch')
const mockedEnv = require('mocked-env')

const server = require('../src/server')

const Domain = require('../src/models/Domain')
const { connectToDatabase, disconnectFromDatabase } = require('./resolvers/_utils')

const base = listen(server)

test.before(connectToDatabase)
test.after.always(disconnectFromDatabase)
test.beforeEach(async (t) => {
	t.context.domain1 = await Domain.create({ title: 'fqdn.example.com' })
	t.context.domain2 = await Domain.create({ title: 'No fqdn' })
})
test.afterEach.always(async (t) => {
	await Domain.findOneAndDelete({ id: t.context.domain1.id })
	await Domain.findOneAndDelete({ id: t.context.domain2.id })
})

test('return cors headers based on fully qualifed domain names', async (t) => {
	const url = new URL('/api', await base)

	const restore = mockedEnv({
		ACKEE_AUTO_ORIGIN: 'true',
	})

	const { headers: fqdnHeaders } = await fetch(url.href, { headers: { Host: 'fqdn.example.com' } })

	t.is(fqdnHeaders.get('Access-Control-Allow-Origin'), 'fqdn.example.com')
	t.is(fqdnHeaders.get('Access-Control-Allow-Methods'), 'GET, POST, PATCH, OPTIONS')
	t.is(fqdnHeaders.get('Access-Control-Allow-Headers'), 'Content-Type, Authorization, Time-Zone')
	t.is(fqdnHeaders.get('Access-Control-Allow-Credentials'), 'true')

	const { headers: noFqdnHeaders } = await fetch(url.href, { headers: { Host: 'No fqdn' } })

	t.is(noFqdnHeaders.get('Access-Control-Allow-Origin'), null)
	t.is(noFqdnHeaders.get('Access-Control-Allow-Methods'), null)
	t.is(noFqdnHeaders.get('Access-Control-Allow-Headers'), null)
	t.is(noFqdnHeaders.get('Access-Control-Allow-Credentials'), null)

	restore()
})