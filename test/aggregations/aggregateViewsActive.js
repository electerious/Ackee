'use strict'

const test = require('ava')
const uuid = require('uuid').v4

const aggregateViewsActive = require('../../src/aggregations/aggregateViewsActive')

test('return aggregation', async (t) => {

	const result = aggregateViewsActive(uuid())

	t.true(Array.isArray(result))

})