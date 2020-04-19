'use strict'

const test = require('ava')
const uuid = require('uuid').v4

const aggregateYearlyViews = require('../../src/aggregations/aggregateYearlyViews')

test('return unique aggregation', async (t) => {

	const result = aggregateYearlyViews(uuid(), true)

	t.true(Array.isArray(result))

})

test('return non-unique aggregation', async (t) => {

	const result = aggregateYearlyViews(uuid(), false)

	t.true(Array.isArray(result))

})