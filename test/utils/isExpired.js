'use strict'

const test = require('ava')

const { day } = require('../../src/utils/times')
const isExpired = require('../../src/utils/isExpired')

test('return false when `timestamp` is valid', (t) => {

	const date = new Date()
	const timestamp = date.getTime()

	const result = isExpired(timestamp, day)

	t.false(result)

})

test('return true when `timestamp` is invalid', (t) => {

	const date = new Date()

	date.setDate(date.getDate() - 1)

	const timestamp = date.getTime()

	const result = isExpired(timestamp, day)

	t.true(result)

})

test('return false when `timestamp` is newer than `ttl`', (t) => {

	const date = new Date()
	const timestamp = date.getTime()

	const result = isExpired(timestamp, 86400000)

	t.false(result)

})

test('return true when `timestamp` is older than `ttl`', (t) => {

	const date = new Date()

	date.setDate(date.getDate() - 1)

	const timestamp = date.getTime()

	const result = isExpired(timestamp, 0)

	t.true(result)

})