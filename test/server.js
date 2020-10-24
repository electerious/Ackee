'use strict'

const test = require('ava')
const uuid = require('uuid').v4
const listen = require('test-listen')
const fetch = require('node-fetch')

const server = require('../src/server')

const base = listen(server)

test('return 404', async (t) => {

	const url = new URL(`/${ uuid() }`, await base)
	const { status } = await fetch(url.href)

	t.is(status, 404)

})