'use strict'

const test = require('ava')

const { subDays } = require('date-fns')

const ranges = require('../../src/constants/ranges')
const zeroDate = require('../../src/utils/zeroDate')
const offsetByRange = require('../../src/utils/offsetByRange')

test('return correct offset for RANGES_LAST_7_DAYS value', async (t) => {

	const result = offsetByRange(ranges.RANGES_LAST_7_DAYS.value)

	t.deepEqual(result, subDays(zeroDate(), 6))

})

test('return correct offset for RANGES_LAST_30_DAYS value', async (t) => {

	const result = offsetByRange(ranges.RANGES_LAST_30_DAYS.value)

	t.deepEqual(result, subDays(zeroDate(), 29))

})

test('return null for RANGES_ALL_TIME value', async (t) => {

	const result = offsetByRange(ranges.RANGES_ALL_TIME.value)

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