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
	t.context.domain2 = await Domain.create({ title: 'not-an-fqdn' })
})
test.afterEach.always(async (t) => {
	await Domain.findOneAndDelete({ id: t.context.domain1.id })
	await Domain.findOneAndDelete({ id: t.context.domain2.id })
})

test('return cors headers for domain with fully qualifed domain name', async (t) => {
	const url = new URL('/api', await base)
	const origin = 'fqdn.example.com'

	const restore = mockedEnv({
		ACKEE_AUTO_ORIGIN: 'true',
	})

	const { headers } = await fetch(url.href, { headers: { Host: origin } })

	t.is(headers.get('Access-Control-Allow-Origin'), origin)
	t.is(headers.get('Access-Control-Allow-Methods'), 'GET, POST, PATCH, OPTIONS')
	t.is(headers.get('Access-Control-Allow-Headers'), 'Content-Type, Authorization, Time-Zone')
	t.is(headers.get('Access-Control-Allow-Credentials'), 'true')

	restore()
})

test('do not return cors headers for domain that is not a fully qualified domain name', async (t) => {
	const url = new URL('/api', await base)
	const origin = 'not-an-fqdn'

	const restore = mockedEnv({
		ACKEE_AUTO_ORIGIN: 'true',
	})

	const { headers } = await fetch(url.href, { headers: { Host: origin } })

	t.is(headers.get('Access-Control-Allow-Origin'), null)
	t.is(headers.get('Access-Control-Allow-Methods'), null)
	t.is(headers.get('Access-Control-Allow-Headers'), null)
	t.is(headers.get('Access-Control-Allow-Credentials'), null)

	restore()
})