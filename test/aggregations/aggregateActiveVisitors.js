'use strict'

const test = require('ava')
const uuid = require('uuid').v4

const aggregateActiveVisitors = require('../../src/aggregations/aggregateActiveVisitors')

test('return aggregation', async (t) => {

	const result = aggregateActiveVisitors(uuid())

	t.true(Array.isArray(result))

})