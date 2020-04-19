'use strict'

const test = require('ava')
const uuid = require('uuid').v4

const aggregateRecentFieldsMultiple = require('../../src/aggregations/aggregateRecentFieldsMultiple')

test('return array', async (t) => {

	const result = aggregateRecentFieldsMultiple(uuid(), [ 'osName', 'osVersion' ])

	t.true(Array.isArray(result))

})