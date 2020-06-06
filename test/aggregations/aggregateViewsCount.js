'use strict'

const test = require('ava')
const uuid = require('uuid').v4

const aggregateViewsCount = require('../../src/aggregations/aggregateViewsCount')
const intervals = require('../../src/constants/intervals')

test('return unique aggregation', async (t) => {

	const result = aggregateViewsCount(uuid(), true, intervals.INTERVALS_DAILY)

	t.true(Array.isArray(result))

})

test('return non-unique aggregation', async (t) => {

	const result = aggregateViewsCount(uuid(), false, intervals.INTERVALS_DAILY)

	t.true(Array.isArray(result))

})