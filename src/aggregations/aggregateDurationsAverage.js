'use strict'

const constants = require('../constants/durations')

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

module.exports = (id) => {

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
				average: {
					$avg: '$duration'
				}
			}
		},
		{
			$group: {
				_id: null,
				average: {
					$avg: '$average'
				}
			}
		},
		{
			$project: {
				_id: false,
				average: '$average'
			}
		}
	]

	if (id != null) {
		aggregation[0].$match.domainId = id
	}

	return aggregation

}