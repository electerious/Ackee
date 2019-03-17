'use strict'

const test = require('ava')

const day = require('../../src/utils/day')
const dateWithOffset = require('../../src/utils/dateWithOffset')

test('use current date by default', async (t) => {

	const tomorrowTimestamp = Date.now() + day
	const tomorrowDate = new Date(tomorrowTimestamp)

	const resultDate = dateWithOffset(1)

	t.is(resultDate.getDate(), tomorrowDate.getDate())

})

test('return tomorrow\'s date', async (t) => {

	const currentDate = new Date()
	const currentTimestamp = currentDate.getTime()
	const tomorrowTimestamp = currentTimestamp + day

	const resultDate = dateWithOffset(1, currentDate)
	const resultTimestamp = resultDate.getTime()

	t.is(resultTimestamp, tomorrowTimestamp)

})