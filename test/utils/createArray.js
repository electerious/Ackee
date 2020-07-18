'use strict'

const test = require('ava')

const createArray = require('../../src/utils/createArray')

test('return boolean', async (t) => {

	const length = 4
	const result = createArray(length)

	t.true(Array.isArray(result))
	t.is(result.length, length)

})