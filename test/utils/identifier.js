'use strict'

const test = require('ava')
const uuid = require('uuid').v4

const identifier = require('../../src/utils/identifier')

test('return different identifiers', async (t) => {

	const domainId = uuid()

	const req = () => ({
		headers: {
			'user-agent': uuid()
		},
		connection: {
			remoteAddress: uuid()
		}
	})

	const a = identifier(req(), domainId)
	const b = identifier(req(), domainId)

	t.not(a, b)

})

test('return same identifiers', async (t) => {

	const domainId = uuid()

	const req = {
		headers: {
			'user-agent': uuid()
		},
		connection: {
			remoteAddress: uuid()
		}
	}

	const a = identifier(req, domainId)
	const b = identifier(req, domainId)

	t.is(a, b)

})