'use strict'

const test = require('ava')
const listen = require('test-listen')
const fetch = require('node-fetch')
const mockedEnv = require('mocked-env')

const server = require('../src/server')

const base = listen(server)

test('return no cors headers if env var specifies none', async (t) => {

	const url = new URL('/api', await base)

	const restore = mockedEnv({
		ACKEE_ALLOW_ORIGIN: undefined
	})

	const { headers } = await fetch(url.href)

	t.is(headers.get('Access-Control-Allow-Origin'), null)
	t.is(headers.get('Access-Control-Allow-Methods'), null)
	t.is(headers.get('Access-Control-Allow-Headers'), null)
	t.is(headers.get('Access-Control-Allow-Credentials'), null)

	restore()

})