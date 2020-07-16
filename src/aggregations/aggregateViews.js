'use strict'

const { subDays, subMonths, subYears, startOfDay, startOfMonth, startOfYear } = require('date-fns')

const intervals = require('../constants/intervals')
const matchDomains = require('../stages/matchDomains')

module.exports = (ids, unique, interval, limit) => {

	const aggregation = [
		matchDomains(ids),
		{
			$group: {
				_id: {},
				count: {
					$sum: 1
				}
			}
		},
		{
			$sort: {
				'_id.year': -1,
				'_id.month': -1,
				'_id.day': -1
			}
		}
	]

	// Because the current day, month or year is always included
	const offset = limit - 1

	if (unique === true) aggregation[0].$match.clientId = {
		$exists: true,
		$ne: null
	}

	if (interval === intervals.INTERVALS_DAILY) {
		aggregation[0].$match.created = { $gte: subDays(startOfDay(new Date()), offset) }
		aggregation[1].$group._id.day = { $dayOfMonth: '$created' }
		aggregation[1].$group._id.month = { $month: '$created' }
		aggregation[1].$group._id.year = { $year: '$created' }
	}

	if (interval === intervals.INTERVALS_MONTHLY) {
		aggregation[0].$match.created = { $gte: subMonths(startOfMonth(new Date()), offset) }
		aggregation[1].$group._id.month = { $month: '$created' }
		aggregation[1].$group._id.year = { $year: '$created' }
	}

	if (interval === intervals.INTERVALS_YEARLY) {
		aggregation[0].$match.created = { $gte: subYears(startOfYear(new Date()), offset) }
		aggregation[1].$group._id.year = { $year: '$created' }
	}

	return aggregation

}