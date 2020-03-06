'use strict'

const test = require('ava')
const uuid = require('uuid/v4')

const aggregateMonthlyViews = require('../../src/aggregations/aggregateMonthlyViews')

test('return unique aggregation', async (t) => {

	const result = aggregateMonthlyViews(uuid(), true)

	t.true(Array.isArray(result))

})

test('return non-unique aggregation', async (t) => {

	const result = aggregateMonthlyViews(uuid(), false)

	t.true(Array.isArray(result))

})