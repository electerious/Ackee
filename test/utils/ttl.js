'use strict'

const test = require('ava')

const ttl = require('../../src/utils/ttl')

test('return true when `timestamp` is valid', (t) => {

	const date = new Date()
	const timestamp = date.getTime()

	const result = ttl(timestamp)

	t.true(result)

})

test('return false when `timestamp` is invalid', (t) => {

	const date = new Date()

	date.setDate(date.getDate() - 1)

	const timestamp = date.getTime()

	const result = ttl(timestamp)

	t.false(result)

})

test('return true when `timestamp` is newer than `ttl`', (t) => {

	const date = new Date()
	const timestamp = date.getTime()

	const result = ttl(timestamp, 86400000)

	t.true(result)

})

test('return false when `timestamp` is older than `ttl`', (t) => {

	const date = new Date()

	date.setDate(date.getDate() - 1)

	const timestamp = date.getTime()

	const result = ttl(timestamp, 0)

	t.false(result)

})