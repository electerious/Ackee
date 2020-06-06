'use strict'

const intervals = require('../constants/intervals')
const matchDomainId = require('../stages/matchDomainId')
const projectDuration = require('../stages/projectDuration')
const projectInterval = require('../stages/projectInterval')
const projectMinInterval = require('../stages/projectMinInterval')
const matchLimit = require('../stages/matchLimit')

module.exports = (id, interval) => {

	const aggregation = [
		matchDomainId(id),
		projectDuration(),
		projectInterval(),
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
		aggregation[5].$group._id.day = { $dayOfMonth: '$created' }
		aggregation[5].$group._id.month = { $month: '$created' }
		aggregation[5].$group._id.year = { $year: '$created' }
		aggregation[6].$sort['_id.year'] = -1
		aggregation[6].$sort['_id.month'] = -1
		aggregation[6].$sort['_id.day'] = -1
	}

	if (interval === intervals.INTERVALS_MONTHLY) {
		aggregation[5].$group._id.month = { $month: '$created' }
		aggregation[5].$group._id.year = { $year: '$created' }
		aggregation[6].$sort['_id.year'] = -1
		aggregation[6].$sort['_id.month'] = -1
	}

	if (interval === intervals.INTERVALS_YEARLY) {
		aggregation[5].$group._id.year = { $year: '$created' }
		aggregation[6].$sort['_id.year'] = -1
	}

	return aggregation

}