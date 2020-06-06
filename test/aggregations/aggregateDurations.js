'use strict'

const test = require('ava')
const uuid = require('uuid').v4

const aggregateDurations = require('../../src/aggregations/aggregateDurations')
const intervals = require('../../src/constants/intervals')

test('return aggregation', async (t) => {

	const result = aggregateDurations(uuid(), intervals.INTERVALS_DAILY)

	t.true(Array.isArray(result))

})