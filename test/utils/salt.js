'use strict'

const test = require('ava')

const salt = require('../../src/utils/salt')

test('return same result as long as it is the same day', async (t) => {

	const a = salt()
	const b = salt()

	t.is(a, b)

})