'use strict'

const test = require('ava')
const listen = require('test-listen')
const fetch = require('node-fetch')
const mockedEnv = require('mocked-env')

const server = require('../src/server')

const base = listen(server)

test('return no cors headers if env var specifies none', async (t) => {

	const restore = mockedEnv({
		ACKEE_ALLOW_ORIGIN: undefined
	})

	const url = new URL(await base)
	const res = await fetch(url.href)
	const headers = res.headers

	t.is(headers.get('Access-Control-Allow-Origin'), null)
	t.is(headers.get('Access-Control-Allow-Methods'), null)
	t.is(headers.get('Access-Control-Allow-Headers'), null)

	restore()

})