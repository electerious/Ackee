'use strict'

const test = require('ava')

const { subDays } = require('date-fns')

const ranges = require('../../src/constants/ranges')
const zeroDate = require('../../src/utils/zeroDate')
const offsetByRange = require('../../src/utils/offsetByRange')

test('return correct offset for RANGES_LAST_24_HOURS', async (t) => {

	const result = offsetByRange(ranges.RANGES_LAST_24_HOURS)

	t.deepEqual(result, subDays(zeroDate(), 1))

})

test('return correct offset for RANGES_LAST_7_DAYS', async (t) => {

	const result = offsetByRange(ranges.RANGES_LAST_7_DAYS)

	t.deepEqual(result, subDays(zeroDate(), 6))

})

test('return correct offset for RANGES_LAST_30_DAYS', async (t) => {

	const result = offsetByRange(ranges.RANGES_LAST_30_DAYS)

	t.deepEqual(result, subDays(zeroDate(), 29))

})

test('return null for RANGES_ALL_TIME', async (t) => {

	const result = offsetByRange(ranges.RANGES_ALL_TIME)

	t.is(result, null)

})


test('return null for other values', async (t) => {

	const resultString = offsetByRange('test')
	const resultNull = offsetByRange(null)
	const resultUndefined = offsetByRange(undefined)

	t.is(resultString, null)
	t.is(resultNull, null)
	t.is(resultUndefined, null)

})