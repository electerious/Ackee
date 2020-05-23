'use strict'

const intervals = require('../constants/intervals')

module.exports = (id, unique, interval) => {

	const aggregation = [
		{
			$match: {
				domainId: id
			}
		},
		{
			$group: {
				_id: {
					day: {
						$dayOfMonth: '$created'
					},
					month: {
						$month: '$created'
					},
					year: {
						$year: '$created'
					}
				},
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
		},
		{
			$limit: 14
		}
	]

	if (unique === true) aggregation[0].$match.clientId = {
		$exists: true,
		$ne: null
	}

	if (interval === intervals.INTERVALS_DAILY) {
		aggregation[1].$group._id.day = { $dayOfMonth: '$created' }
		aggregation[1].$group._id.month = { $month: '$created' }
		aggregation[1].$group._id.year = { $year: '$created' }
		aggregation[2].$sort['_id.year'] = -1
		aggregation[2].$sort['_id.month'] = -1
		aggregation[2].$sort['_id.day'] = -1
	}

	if (interval === intervals.INTERVALS_MONTHLY) {
		aggregation[1].$group._id.month = { $month: '$created' }
		aggregation[1].$group._id.year = { $year: '$created' }
		aggregation[2].$sort['_id.year'] = -1
		aggregation[2].$sort['_id.month'] = -1
	}

	if (interval === intervals.INTERVALS_YEARLY) {
		aggregation[1].$group._id.year = { $year: '$created' }
		aggregation[2].$sort['_id.year'] = -1
	}

	return aggregation

}