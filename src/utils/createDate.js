'use strict'

const { subMilliseconds, subHours, subDays, subMonths, subYears, startOfHour, startOfDay, startOfMonth, startOfYear } = require('date-fns')
const serverTimeZone = require('./timeZone')

module.exports = (userTimeZone = serverTimeZone) => {

	const utcDate = Date.now()

	return {
		userTimeZone,
		// Get a date with an offset
		lastMilliseconds: (milliseconds) => subMilliseconds(utcDate, milliseconds),
		lastHours: (hours) => subHours(utcDate, hours),
		lastDays: (days) => subDays(utcDate, days),
		lastMonths: (months) => subMonths(utcDate, months),
		lastYears: (years) => subYears(utcDate, years),
		// Get a date with an offset that always includes the whole unit of the given interval
		includeHours: (hours) => subHours(startOfHour(utcDate), hours - 1),
		includeDays: (days) => subDays(startOfDay(utcDate), days - 1),
		includeMonths: (months) => subMonths(startOfMonth(utcDate), months - 1),
		includeYears: (years) => subYears(startOfYear(utcDate), years - 1)
	}

}