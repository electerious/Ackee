'use strict'

const test = require('ava')
const listen = require('test-listen')
const fetch = require('node-fetch')
const mockedEnv = require('mocked-env')

const server = require('../src/server')

const base = listen(server)

test('return cors headers if env vars specify wildcard', async (t) => {

	const url = new URL(await base)

	const restore = mockedEnv({
		ACKEE_ALLOW_ORIGIN: '*'
	})

	const res = await fetch(url.href)
	const headers = res.headers

	t.is(headers.get('Access-Control-Allow-Origin'), '*')
	t.is(headers.get('Access-Control-Allow-Methods'), 'GET, POST, PATCH, OPTIONS')
	t.is(headers.get('Access-Control-Allow-Headers'), 'Content-Type')

	restore()

})