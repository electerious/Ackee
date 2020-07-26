'use strict'

const test = require('ava')
const uuid = require('uuid').v4

const aggregateActiveVisitors = require('../../src/aggregations/aggregateActiveVisitors')
const createDate = require('../../src/utils/createDate')

test('return aggregation', async (t) => {

	const result = aggregateActiveVisitors(uuid(), createDate())

	t.true(Array.isArray(result))

})