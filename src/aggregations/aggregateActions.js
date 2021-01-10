'use strict'

const intervals = require('../constants/intervals')
const matchEvents = require('../stages/matchEvents')

module.exports = (ids, average, interval, limit, dateDetails) => {

	const aggregation = [
		matchEvents(ids),
		{
			$group: {
				_id: {}
			}
		}
	]

	aggregation[0].$match.created = { $gte: dateDetails.includeFnByInterval(interval)(limit) }
	aggregation[1].$group.count = average === true ? { $avg: '$value' } : { $sum: '$value' }

	const dateExpression = { date: '$created', timezone: dateDetails.userTimeZone }
	const matchDay = [ intervals.INTERVALS_DAILY ].includes(interval)
	const matchMonth = [ intervals.INTERVALS_DAILY, intervals.INTERVALS_MONTHLY ].includes(interval)
	const matchYear = [ intervals.INTERVALS_DAILY, intervals.INTERVALS_MONTHLY, intervals.INTERVALS_YEARLY ].includes(interval)

	if (matchDay === true) aggregation[1].$group._id.day = { $dayOfMonth: dateExpression }
	if (matchMonth === true) aggregation[1].$group._id.month = { $month: dateExpression }
	if (matchYear === true) aggregation[1].$group._id.year = { $year: dateExpression }

	return aggregation

}