'use strict'

const intervals = require('../constants/intervals')
const matchDomains = require('../stages/matchDomains')

module.exports = (ids, unique, interval, limit, dateDetails) => {

	const aggregation = [
		matchDomains(ids),
		{
			$group: {
				_id: {},
				count: {
					$sum: 1
				}
			}
		}
	]

	if (unique === true) aggregation[0].$match.clientId = {
		$exists: true,
		$ne: null
	}

	aggregation[0].$match.created = { $gte: dateDetails.includeFnByInterval(interval)(limit) }

	const dateExpression = { date: '$created', timezone: dateDetails.userTimeZone }
	const matchDay = [ intervals.INTERVALS_DAILY ].includes(interval)
	const matchMonth = [ intervals.INTERVALS_DAILY, intervals.INTERVALS_MONTHLY ].includes(interval)
	const matchYear = [ intervals.INTERVALS_DAILY, intervals.INTERVALS_MONTHLY, intervals.INTERVALS_YEARLY ].includes(interval)

	if (matchDay === true) aggregation[1].$group._id.day = { $dayOfMonth: dateExpression }
	if (matchMonth === true) aggregation[1].$group._id.month = { $month: dateExpression }
	if (matchYear === true) aggregation[1].$group._id.year = { $year: dateExpression }

	return aggregation

}