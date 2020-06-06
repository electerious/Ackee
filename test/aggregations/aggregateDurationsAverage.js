'use strict'

const test = require('ava')
const uuid = require('uuid').v4

const aggregateDurationsAverage = require('../../src/aggregations/aggregateDurationsAverage')

test('return aggregation', async (t) => {

	const result = aggregateDurationsAverage(uuid())

	t.true(Array.isArray(result))

})