'use strict'

const Record = require('../schemas/Record')
const constants = require('../constants/durations')
const intervals = require('../constants/intervals')
const offsetByRange = require('../utils/offsetByRange')

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

const getAverage = async (id, interval) => {

	const aggregation = [
		{
			$match: {
				domainId: id
			}
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

	return Record.aggregate(aggregation)

}

const getDetailed = async (id, range) => {

	const dateOffset = offsetByRange(range)

	const aggregateAverageEntries = [
		{
			$match: {
				domainId: id
			}
		},
		projectDuration,
		projectInterval,
		projectMinInterval,
		matchLimit,
		{
			$group: {
				_id: null,
				average: {
					$avg: '$duration'
				}
			}
		}
	]

	if (dateOffset != null) {
		aggregateAverageEntries[0].$match.created = { $gte: dateOffset }
	}

	const averageEntries = await Record.aggregate(aggregateAverageEntries)

	// No need to continue when there're no entries
	if (averageEntries.length === 0) return []

	const aggregateDetailedEntries = [
		{
			$match: {
				domainId: id
			}
		},
		projectDuration,
		projectInterval,
		{
			$group: {
				_id: {
					$cond: {
						if: {
							$gte: [ '$duration', constants.DURATIONS_LIMIT ]
						},
						then: constants.DURATIONS_LIMIT,
						else: '$duration'
					}
				},
				count: {
					$sum: 1
				}
			}
		},
		{
			$addFields: {
				average: averageEntries[0].average
			}
		},
		{
			$sort: {
				_id: 1
			}
		}
	]

	if (dateOffset != null) {
		aggregateDetailedEntries[0].$match.created = { $gte: dateOffset }
	}

	const detailedEntries = await Record.aggregate(aggregateDetailedEntries)

	return detailedEntries

}

const get = async (id, type, range, interval) => {

	switch (type) {
		case constants.DURATIONS_TYPE_AVERAGE: return getAverage(id, interval)
		case constants.DURATIONS_TYPE_DETAILED: return getDetailed(id, range)
	}

}

module.exports = {
	get
}