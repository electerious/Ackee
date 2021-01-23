'use strict'

const { utcToZonedTime } = require('date-fns-tz')

const Record = require('../models/Record')
const aggregateDurations = require('../aggregations/aggregateDurations')
const intervals = require('../constants/intervals')
const createArray = require('../utils/createArray')
const matchesDate = require('../utils/matchesDate')

const get = async (ids, interval, limit, dateDetails) => {

	const aggregation = (() => {

		return aggregateDurations(ids, interval, limit, dateDetails)

	})()

	const enhance = (entries) => {

		const matchDay = [ intervals.INTERVALS_DAILY ].includes(interval)
		const matchMonth = [ intervals.INTERVALS_DAILY, intervals.INTERVALS_MONTHLY ].includes(interval)
		const matchYear = [ intervals.INTERVALS_DAILY, intervals.INTERVALS_MONTHLY, intervals.INTERVALS_YEARLY ].includes(interval)

		return createArray(limit).map((_, index) => {

			const date = dateDetails.lastFnByInterval(interval)(index)

			// Database entries include the day, month and year in the
			// timezone of the user. We therefore need to match it against a
			// date in the timezone of the user.
			const userZonedDate = utcToZonedTime(date, dateDetails.userTimeZone)

			// Find a entry that matches the date
			const entry = entries.find((entry) => {
				return matchesDate(
					matchDay === true ? entry._id.day : undefined,
					matchMonth === true ? entry._id.month : undefined,
					matchYear === true ? entry._id.year : undefined,
					userZonedDate
				)
			})

			return {
				id: date,
				count: entry == null ? 0 : entry.count
			}

		})

	}

	return enhance(
		await Record.aggregate(aggregation)
	)

}

module.exports = {
	get
}