'use strict'

const test = require('ava')
const listen = require('test-listen')
const fetch = require('node-fetch')
const mockedEnv = require('mocked-env')

const server = require('../src/server')

const base = listen(server)

test('return cors headers if env var specifies one', async (t) => {

	const url = new URL('/api', await base)

	const restore = mockedEnv({
		ACKEE_ALLOW_ORIGIN: url.origin
	})

	const { headers } = await fetch(url.href)

	t.is(headers.get('Access-Control-Allow-Origin'), url.origin)
	t.is(headers.get('Access-Control-Allow-Methods'), 'GET, POST, PATCH, OPTIONS')
	t.is(headers.get('Access-Control-Allow-Headers'), 'Content-Type, Authorization, Time-Zone')
	t.is(headers.get('Access-Control-Allow-Credentials'), 'true')

	restore()

})