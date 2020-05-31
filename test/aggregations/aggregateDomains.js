'use strict'

const test = require('ava')

const aggregateDomains = require('../../src/aggregations/aggregateDomains')

test('return unique aggregation', async (t) => {

	const result = aggregateDomains()

	t.true(Array.isArray(result))

})