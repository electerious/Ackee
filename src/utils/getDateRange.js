'use strict'

const { subDays } = require('date-fns')

const zeroDate = require('./zeroDate')
const { ALL_TIME, LAST_7_DAYS, LAST_30_DAYS } = require('../constants/dateRange')

module.exports = (dateRange) => {
	switch (dateRange) {
		case ALL_TIME.value:
			return null
		case LAST_30_DAYS.value:
			return { $gte: subDays(zeroDate(), 29) }
		case LAST_7_DAYS.value:
			return { $gte: subDays(zeroDate(), 6) }
		default:
			return null
	}
}