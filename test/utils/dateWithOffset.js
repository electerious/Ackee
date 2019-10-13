'use strict'

const test = require('ava')

const { day } = require('../../src/utils/times')
const dateWithOffset = require('../../src/utils/dateWithOffset')

test('use current date by default', async (t) => {

	const tomorrowTimestamp = Date.now() + day
	const tomorrowDate = new Date(tomorrowTimestamp)

	const resultDate = dateWithOffset(1)

	t.is(resultDate.getDate(), tomorrowDate.getDate())

})