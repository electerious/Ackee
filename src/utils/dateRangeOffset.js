'use strict'

const { subDays } = require('date-fns')

const zeroDate = require('./zeroDate')
const { LAST_7_DAYS, LAST_30_DAYS } = require('../constants/dateRange')

module.exports = (dateRangeValue) => {

	switch (dateRangeValue) {
		case LAST_7_DAYS.value:
			return subDays(zeroDate(), 6)
		case LAST_30_DAYS.value:
			return subDays(zeroDate(), 29)
		default:
			return null
	}

}