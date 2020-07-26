'use strict'

const test = require('ava')
const uuid = require('uuid').v4

const aggregateTopFields = require('../../src/aggregations/aggregateTopFields')
const createDate = require('../../src/utils/createDate')

test('return aggregation', async (t) => {

	const result = aggregateTopFields(uuid(), [ 'osName', 'osVersion' ], createDate())

	t.true(Array.isArray(result))

})