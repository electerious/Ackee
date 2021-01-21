'use strict'

const test = require('ava')
const uuid = require('uuid').v4

const aggregateTopRecords = require('../../src/aggregations/aggregateTopRecords')
const createDate = require('../../src/utils/createDate')

test('return aggregation', async (t) => {

	const result = aggregateTopRecords(uuid(), [ 'osName', 'osVersion' ], createDate())

	t.true(Array.isArray(result))

})