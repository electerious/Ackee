'use strict'

const test = require('ava')
const uuid = require('uuid/v4')

const context = require('../../src/utils/context')

test('return object context', (t) => {

	const key = uuid()
	const value = uuid()

	const result = context({
		context: {
			[key]: value
		}
	})

	t.deepEqual(result, {
		[key]: value
	})

})

test('add key and value to object', (t) => {

	const key = uuid()
	const value = uuid()

	const result = context({}, key, value)

	t.deepEqual(result, {
		[key]: value
	})

})