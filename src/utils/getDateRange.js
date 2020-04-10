'use strict'

const { subDays } = require('date-fns')

const zeroDate = require('./zeroDate')
const { ALL_TIME, LAST_7_DAYS, LAST_30_DAYS } = require('../constants/dateRange')

module.exports = (dateRange) => {
	switch (dateRange) {
		case ALL_TIME.value:
			return null
		case LAST_30_DAYS.value:
			return { $gte: subDays(zeroDate(), LAST_30_DAYS.value) }
		case LAST_7_DAYS.value:
			return { $gte: subDays(zeroDate(), LAST_7_DAYS.value) }
		default:
			return null
	}
}