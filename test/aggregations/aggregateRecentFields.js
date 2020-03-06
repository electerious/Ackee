'use strict'

const test = require('ava')
const uuid = require('uuid/v4')

const aggregateRecentFields = require('../../src/aggregations/aggregateRecentFields')

test('return array', async (t) => {

	const result = aggregateRecentFields(uuid(), 'siteReferrer')

	t.true(Array.isArray(result))

})