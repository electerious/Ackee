'use strict'

const test = require('ava')

const customTrackerUrl = require('../../src/utils/customTrackerUrl')

test('return custom URL', async (t) => {

	const result = customTrackerUrl

	// The name is specified in the package.json ava configuration
	t.is(result, `/custom%20name.js`)

})