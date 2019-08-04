'use strict'

const test = require('ava')
const uuid = require('uuid/v4')

const identifier = require('../../src/utils/identifier')

test('return different identifiers', async (t) => {

	const req = () => ({
		headers: {
			'user-agent': uuid()
		},
		connection: {
			remoteAddress: uuid()
		}
	})

	const a = identifier(req())
	const b = identifier(req())

	t.false(a === b)

})