'use strict'

const { subDays, subMonths, subYears, startOfDay, startOfMonth, startOfYear } = require('date-fns')

const intervals = require('../constants/intervals')
const matchDomainId = require('../stages/matchDomainId')
const projectDuration = require('../stages/projectDuration')
const projectMinInterval = require('../stages/projectMinInterval')
const matchLimit = require('../stages/matchLimit')

module.exports = (id, interval) => {

	const aggregation = [
		matchDomainId(id),
		projectDuration(),
		projectMinInterval(),
		matchLimit(),
		{
			$group: {
				_id: {},
				average: {
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

	if (interval === intervals.INTERVALS_DAILY) {
		aggregation[0].$match.created = { $gte: subDays(startOfDay(new Date()), 13) }
		aggregation[4].$group._id.day = { $dayOfMonth: '$created' }
		aggregation[4].$group._id.month = { $month: '$created' }
		aggregation[4].$group._id.year = { $year: '$created' }
	}

	if (interval === intervals.INTERVALS_MONTHLY) {
		aggregation[0].$match.created = { $gte: subMonths(startOfMonth(new Date()), 13) }
		aggregation[4].$group._id.month = { $month: '$created' }
		aggregation[4].$group._id.year = { $year: '$created' }
	}

	if (interval === intervals.INTERVALS_YEARLY) {
		aggregation[0].$match.created = { $gte: subYears(startOfYear(new Date()), 13) }
		aggregation[4].$group._id.year = { $year: '$created' }
	}

	return aggregation

}