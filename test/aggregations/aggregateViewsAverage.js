'use strict'

const test = require('ava')
const uuid = require('uuid').v4

const aggregateViewsAverage = require('../../src/aggregations/aggregateViewsAverage')

test('return unique aggregation', async (t) => {

	const result = aggregateViewsAverage(uuid(), true)

	t.true(Array.isArray(result))

})

test('return non-unique aggregation', async (t) => {

	const result = aggregateViewsAverage(uuid(), false)

	t.true(Array.isArray(result))

})