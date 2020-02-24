'use strict'

const test = require('ava')

const zeroDate = require('../../src/utils/zeroDate')

test('return date without hours, minutes, seconds and milliseconds', async (t) => {

	const date = zeroDate()

	t.is(date.getHours(), 0)
	t.is(date.getMinutes(), 0)
	t.is(date.getSeconds(), 0)
	t.is(date.getMilliseconds(), 0)

})