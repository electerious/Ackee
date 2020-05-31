'use strict'

const constants = require('../constants/durations')
const intervals = require('../constants/intervals')

// The time that elapsed between the creation and updating of records.
const projectDuration = {
	$project: {
		created: '$created',
		duration: {
			$subtract: [ '$updated', '$created' ]
		}
	}
}

// Ackee tracks durations in an interval, but some durations are between
// possible interval times. This could be caused by a network delay or the
// browser who's throttling JS execution. This step rounds all durations
// down to the nearest possible interval to get rid of inaccuracy.
const projectInterval = {
	$project: {
		created: '$created',
		duration: {
			$multiply: [
				{
					$floor: [
						{
							$divide: [ '$duration', constants.DURATIONS_INTERVAL ]
						}
					]
				},
				constants.DURATIONS_INTERVAL
			]
		}
	}
}

// Visits below the tracking interval will have a duration of zero. That's
// incorrect as visitors spent time on the site, but just not enough. This
// step sets the minimum duration to the half of the tracking interval.
// This value is a compromise that doesn't influence the average too much.
const projectMinInterval = {
	$project: {
		created: '$created',
		duration: {
			$cond: {
				if: {
					$lt: [ '$duration', constants.DURATIONS_INTERVAL ]
				},
				then: constants.DURATIONS_INTERVAL / 2,
				else: '$duration'
			}
		}
	}
}

// Some visitors keep sites open in the background. Their duration is often
// way above the limit. This distorts the average and should be omitted.
const matchLimit = {
	$match: {
		duration: {
			$lt: constants.DURATIONS_LIMIT
		}
	}
}

module.exports = (id, interval) => {

	const aggregation = [
		{
			$match: {}
		},
		projectDuration,
		projectInterval,
		projectMinInterval,
		matchLimit,
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

	if (id != null) {
		aggregation[0].$match.domainId = id
	}

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