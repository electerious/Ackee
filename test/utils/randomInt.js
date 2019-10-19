'use strict'

const test = require('ava')

const randomInt = require('../../src/utils/randomInt')

test('return random integer', async (t) => {

	const result = randomInt(0, 1000)

	t.true(Number.isInteger(result))

})