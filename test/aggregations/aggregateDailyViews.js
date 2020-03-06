'use strict'

const test = require('ava')
const uuid = require('uuid/v4')

const aggregateDailyViews = require('../../src/aggregations/aggregateDailyViews')

test('return unique aggregation', async (t) => {

	const result = aggregateDailyViews(uuid(), true)

	t.true(Array.isArray(result))

})

test('return non-unique aggregation', async (t) => {

	const result = aggregateDailyViews(uuid(), false)

	t.true(Array.isArray(result))

})