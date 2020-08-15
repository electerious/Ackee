'use strict'

const test = require('ava')
const uuid = require('uuid').v4

const aggregateViews = require('../../src/aggregations/aggregateViews')
const intervals = require('../../src/constants/intervals')
const createDate = require('../../src/utils/createDate')

test('return unique aggregation', async (t) => {

	const result = aggregateViews(uuid(), true, intervals.INTERVALS_DAILY, 14, createDate())

	t.true(Array.isArray(result))

})

test('return non-unique aggregation', async (t) => {

	const result = aggregateViews(uuid(), false, intervals.INTERVALS_DAILY, 14, createDate())

	t.true(Array.isArray(result))

})