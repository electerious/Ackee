'use strict'

const { subMilliseconds, subHours, subDays, subMonths, subYears, startOfDay, startOfMonth, startOfYear } = require('date-fns')
const serverTimeZone = require('./timeZone')

module.exports = (userTimeZone = serverTimeZone) => {

	const currentDate = new Date()

	// This is the biggest, positive timezone offset possible (starting from UTC).
	// We should always additionally include this amount of hours when selecting data,
	// when data is grouped by day, month or year. This ensures that we don't exclude
	// relevant data. E.g. if you're GMT+2 and we only include the data of the current
	// day, than we will miss 2 hours of data. This is also the case in the other
	// direction. GMT-2 will include 2 hours more data, but that's not a problem,
	// because the data will be removed from the output when enhancing the data.
	// We could also use the real offset of userTimeZone, but that would only make
	// things more complicated. The max offset does the job.
	const timeZoneToleranz = 14

	return {
		userTimeZone,
		// Get a date with an offset
		lastMilliseconds: (milliseconds) => subMilliseconds(currentDate, milliseconds),
		lastHours: (hours) => subHours(currentDate, hours),
		lastDays: (days) => subDays(currentDate, days),
		lastMonths: (months) => subMonths(currentDate, months),
		lastYears: (years) => subYears(currentDate, years),
		// Get a date with an offset that always includes the whole unit of the given interval and a timezone toleranz
		includeDays: (days) => subHours(subDays(startOfDay(currentDate), days - 1), timeZoneToleranz),
		includeMonths: (months) => subHours(subMonths(startOfMonth(currentDate), months - 1), timeZoneToleranz),
		includeYears: (years) => subHours(subYears(startOfYear(currentDate), years - 1), timeZoneToleranz)
	}

}