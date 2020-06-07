'use strict'

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
			$sort: {}
		},
		{
			$limit: 14
		}
	]

	if (interval === intervals.INTERVALS_DAILY) {
		aggregation[4].$group._id.day = { $dayOfMonth: '$created' }
		aggregation[4].$group._id.month = { $month: '$created' }
		aggregation[4].$group._id.year = { $year: '$created' }
		aggregation[5].$sort['_id.year'] = -1
		aggregation[5].$sort['_id.month'] = -1
		aggregation[5].$sort['_id.day'] = -1
	}

	if (interval === intervals.INTERVALS_MONTHLY) {
		aggregation[4].$group._id.month = { $month: '$created' }
		aggregation[4].$group._id.year = { $year: '$created' }
		aggregation[5].$sort['_id.year'] = -1
		aggregation[5].$sort['_id.month'] = -1
	}

	if (interval === intervals.INTERVALS_YEARLY) {
		aggregation[4].$group._id.year = { $year: '$created' }
		aggregation[5].$sort['_id.year'] = -1
	}

	return aggregation

}