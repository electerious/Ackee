'use strict'

const test = require('ava')
const uuid = require('uuid').v4

const aggregateRecentFields = require('../../src/aggregations/aggregateRecentFields')

test('return aggregation', async (t) => {

	const result = aggregateRecentFields(uuid(), [ 'osName', 'osVersion' ])

	t.true(Array.isArray(result))

})