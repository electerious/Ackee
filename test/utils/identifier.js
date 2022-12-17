'use strict'

const test = require('ava')
const uuid = require('uuid').v4

const identifier = require('../../src/utils/identifier')

test('return different identifiers', (t) => {
	const domainId = uuid()

	const request = () => ({
		headers: {
			'user-agent': uuid(),
		},
		connection: {
			remoteAddress: uuid(),
		},
	})

	const requestA = request()
	const requestB = request()

	const a = identifier(requestA, requestA.headers['user-agent'], domainId)
	const b = identifier(requestB, requestB.headers['user-agent'], domainId)

	t.not(a, b)
})

test('return same identifiers', (t) => {
	const domainId = uuid()

	const request = {
		headers: {
			'user-agent': uuid(),
		},
		connection: {
			remoteAddress: uuid(),
		},
	}

	const a = identifier(request, request.headers['user-agent'], domainId)
	const b = identifier(request, request.headers['user-agent'], domainId)

	t.is(a, b)
})