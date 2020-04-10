'use strict'

const test = require('ava')

const { subDays } = require('date-fns')

const { LAST_7_DAYS, LAST_30_DAYS, ALL_TIME } = require('../../src/constants/dateRange')
const zeroDate = require('../../src/utils/zeroDate')
const dateRangeOffset = require('../../src/utils/dateRangeOffset')

test('return correct value for LAST_7_DAYS value', async (t) => {

	const result = dateRangeOffset(LAST_7_DAYS.value)

	t.deepEqual(result, subDays(zeroDate(), 6))

})

test('return correct value for LAST_30_DAYS value', async (t) => {

	const result = dateRangeOffset(LAST_30_DAYS.value)

	t.deepEqual(result, subDays(zeroDate(), 29))

})

test('return null for ALL_TIME value', async (t) => {

	const result = dateRangeOffset(ALL_TIME.value)

	t.is(result, null)

})


test('return null for other value', async (t) => {

	const resultString = dateRangeOffset('test')
	const resultNull = dateRangeOffset(null)
	const resultUndefined = dateRangeOffset(undefined)

	t.is(resultString, null)
	t.is(resultNull, null)
	t.is(resultUndefined, null)

})
