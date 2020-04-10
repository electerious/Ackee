'use strict'

const test = require('ava')
const uuid = require('uuid/v4')

const aggregateTopFieldsMultiple = require('../../src/aggregations/aggregateTopFieldsMultiple')

test('return array', async (t) => {

	const result = aggregateTopFieldsMultiple(uuid(), [ 'osName', 'osVersion' ])

	t.true(Array.isArray(result))

})