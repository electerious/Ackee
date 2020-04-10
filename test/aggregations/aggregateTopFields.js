'use strict'

const test = require('ava')
const uuid = require('uuid').v4

const aggregateTopFields = require('../../src/aggregations/aggregateTopFields')

test('return array', async (t) => {

	const result = aggregateTopFields(uuid(), 'siteReferrer')

	t.true(Array.isArray(result))

})