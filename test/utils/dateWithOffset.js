'use strict'

const test = require('ava')

const { day } = require('../../src/utils/times')
const dateWithOffset = require('../../src/utils/dateWithOffset')

test('return today', async (t) => {

	const todayDate = new Date()

	const resultDate = dateWithOffset(0)

	t.is(resultDate.getDate(), todayDate.getDate())
	t.is(resultDate.getHours(), 0)
	t.is(resultDate.getMinutes(), 0)
	t.is(resultDate.getSeconds(), 0)
	t.is(resultDate.getMilliseconds(), 0)

})

test('return tomorrow', async (t) => {

	const tomorrowTimestamp = Date.now() + day
	const tomorrowDate = new Date(tomorrowTimestamp)

	const resultDate = dateWithOffset(1)

	t.is(resultDate.getDate(), tomorrowDate.getDate())
	t.is(resultDate.getHours(), 0)
	t.is(resultDate.getMinutes(), 0)
	t.is(resultDate.getSeconds(), 0)
	t.is(resultDate.getMilliseconds(), 0)

})

test('return yesterday', async (t) => {

	const yesterdayTimestamp = Date.now() - day
	const yesterdayDate = new Date(yesterdayTimestamp)

	const resultDate = dateWithOffset(-1)

	t.is(resultDate.getDate(), yesterdayDate.getDate())
	t.is(resultDate.getHours(), 0)
	t.is(resultDate.getMinutes(), 0)
	t.is(resultDate.getSeconds(), 0)
	t.is(resultDate.getMilliseconds(), 0)

})