'use strict'

const test = require('ava')
const listen = require('test-listen')
const fetch = require('node-fetch')
const mockedEnv = require('mocked-env')

const server = require('../src/server')

const base = listen(server)

test('return cors headers with no origin if hostname not whitelisted in env var', async (t) => {

	const url = new URL(await base)

	const restore = mockedEnv({
		ACKEE_ALLOW_ORIGIN: `https://example.com`
	})

	const res = await fetch(url.href)
	const headers = res.headers

	t.is(headers.get('Access-Control-Allow-Origin'), null)
	t.is(headers.get('Access-Control-Allow-Methods'), null)
	t.is(headers.get('Access-Control-Allow-Headers'), null)

	restore()

})