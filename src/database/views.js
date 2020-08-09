'use strict'

const Record = require('../schemas/Record')
const aggregateViews = require('../aggregations/aggregateViews')
const constants = require('../constants/views')
const intervals = require('../constants/intervals')
const createArray = require('../utils/createArray')
const matchesDate = require('../utils/matchesDate')

const includeFn = (dateDetails, interval) => {

	switch (interval) {
		case intervals.INTERVALS_DAILY: return dateDetails.includeDays
		case intervals.INTERVALS_MONTHLY: return dateDetails.includeMonths
		case intervals.INTERVALS_YEARLY: return dateDetails.includeYears
	}

}

const get = async (ids, type, interval, limit, dateDetails) => {

	const enhance = (entries) => {

		const matchDay = [ intervals.INTERVALS_DAILY ].includes(interval)
		const matchMonth = [ intervals.INTERVALS_DAILY, intervals.INTERVALS_MONTHLY ].includes(interval)
		const matchYear = [ intervals.INTERVALS_DAILY, intervals.INTERVALS_MONTHLY, intervals.INTERVALS_YEARLY ].includes(interval)

		return createArray(limit).map((_, index) => {

			// Add +1 to the index, because the index starts at zero and
			// the date fn must include at least one day.
			const date = includeFn(dateDetails, interval)(index + 1)

			// Find a entry that matches the date
			const entry = entries.find((entry) => {
				return matchesDate(
					matchDay === true ? entry._id.day : undefined,
					matchMonth === true ? entry._id.month : undefined,
					matchYear === true ? entry._id.year : undefined,
					date
				)
			})

			return {
				id: date,
				count: entry == null ? 0 : entry.count
			}

		})

	}

	const aggregation = (() => {

		if (type === constants.VIEWS_TYPE_UNIQUE) return aggregateViews(ids, true, interval, limit, dateDetails)
		if (type === constants.VIEWS_TYPE_TOTAL) return aggregateViews(ids, false, interval, limit, dateDetails)

	})()

	return enhance(
		await Record.aggregate(aggregation)
	)

}

module.exports = {
	get
}