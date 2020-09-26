'use strict'

const test = require('ava')

const customTracker = require('../../src/utils/customTracker')

test('return that a custom tracker exists', async (t) => {

	const result = customTracker.exists

	t.true(result)

})

test('return custom URL', async (t) => {

	const result = customTracker.url

	// The name is specified in the package.json ava configuration
	t.is(result, `/custom%20name.js`)

})

test('return custom path', async (t) => {

	const result = customTracker.path

	// The name is specified in the package.json ava configuration
	t.is(result, `custom name.js`)

})