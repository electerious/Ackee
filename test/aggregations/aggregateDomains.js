'use strict'

const test = require('ava')

const aggregateDomains = require('../../src/aggregations/aggregateDomains')

test('return aggregation', async (t) => {

	const result = aggregateDomains()

	t.true(Array.isArray(result))

})