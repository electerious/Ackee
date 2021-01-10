'use strict'

const test = require('ava')
const uuid = require('uuid').v4

const aggregateRecentRecords = require('../../src/aggregations/aggregateRecentRecords')

test('return aggregation', async (t) => {

	const result = aggregateRecentRecords(uuid(), [ 'osName', 'osVersion' ])

	t.true(Array.isArray(result))

})