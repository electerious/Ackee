'use strict'

const test = require('ava')
const uuid = require('uuid').v4

const aggregateNewFields = require('../../src/aggregations/aggregateNewFields')

test('return array', async (t) => {

	const result = aggregateNewFields(uuid(), 'siteReferrer')

	t.true(Array.isArray(result))

})