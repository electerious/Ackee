'use strict'

const test = require('ava')

const isDefined = require('../../src/utils/isDefined')

test('return true when defined', async (t) => {

	const result = isDefined('defined')

	t.true(result)

})

test('return true when undefined', async (t) => {

	const result = isDefined()

	t.false(result)

})