'use strict'

const test = require('ava')

const { subDays } = require('date-fns')

const zeroDate = require('../../src/utils/zeroDate')
const getDateRange = require('../../src/utils/dateOffsetByDateRange')
const {
	ALL_TIME,
	LAST_7_DAYS,
	LAST_30_DAYS
} = require('../../src/constants/dateRange')

test('return correct value for LAST_7_DAYS value', async (t) => {

	const result = getDateRange(LAST_7_DAYS.value)

	t.deepEqual(result, subDays(zeroDate(), 6))

})

test('return correct value for LAST_30_DAYS value', async (t) => {

	const result = getDateRange(LAST_30_DAYS.value)

	t.deepEqual(result, subDays(zeroDate(), 29))

})

test('return null for ALL_TIME value', async (t) => {

	const result = getDateRange(ALL_TIME.value)

	t.is(result, null)

})


test('return null for other value', async (t) => {

	const resultString = getDateRange('test')
	const resultNull = getDateRange(null)
	const resultUndefined = getDateRange(undefined)

	t.is(resultString, null)
	t.is(resultNull, null)
	t.is(resultUndefined, null)

})

