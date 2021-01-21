'use strict'

const test = require('ava')

const { day } = require('../../src/utils/times')
const isExpired = require('../../src/utils/isExpired')

test('return true when `timestamp` has expired', (t) => {

	const date = new Date()
	date.setDate(date.getDate() - 2)
	const timestamp = date.getTime()

	const result = isExpired(timestamp, day)

	t.true(result)

})

test('return false when `timestamp` is valid', (t) => {

	const timestamp = Date.now()

	const result = isExpired(timestamp, day)

	t.false(result)

})