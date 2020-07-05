'use strict'

const { subDays, subMonths, subYears, startOfDay, startOfMonth, startOfYear } = require('date-fns')

const intervals = require('../constants/intervals')
const matchDomains = require('../stages/matchDomains')
const projectDuration = require('../stages/projectDuration')
const projectMinInterval = require('../stages/projectMinInterval')
const matchLimit = require('../stages/matchLimit')

module.exports = (ids, interval, limit) => {

	const aggregation = [
		matchDomains(ids),
		projectDuration(),
		projectMinInterval(),
		matchLimit(),
		{
			$group: {
				_id: {},
				count: {
					$avg: '$duration'
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

	if (interval === intervals.INTERVALS_DAILY) {
		aggregation[0].$match.created = { $gte: subDays(startOfDay(new Date()), offset) }
		aggregation[4].$group._id.day = { $dayOfMonth: '$created' }
		aggregation[4].$group._id.month = { $month: '$created' }
		aggregation[4].$group._id.year = { $year: '$created' }
	}

	if (interval === intervals.INTERVALS_MONTHLY) {
		aggregation[0].$match.created = { $gte: subMonths(startOfMonth(new Date()), offset) }
		aggregation[4].$group._id.month = { $month: '$created' }
		aggregation[4].$group._id.year = { $year: '$created' }
	}

	if (interval === intervals.INTERVALS_YEARLY) {
		aggregation[0].$match.created = { $gte: subYears(startOfYear(new Date()), offset) }
		aggregation[4].$group._id.year = { $year: '$created' }
	}

	return aggregation

}