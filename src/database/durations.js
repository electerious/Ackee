'use strict'

const Record = require('../schemas/Record')
const dateWithOffset = require('../utils/dateWithOffset')

const {
	DURATIONS_INTERVAL,
	DURATIONS_LIMIT,
	DURATIONS_TYPE_AVERAGE,
	DURATIONS_TYPE_DETAILED
} = require('../constants/durations')

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
							$divide: [ '$duration', DURATIONS_INTERVAL ]
						}
					]
				},
				DURATIONS_INTERVAL
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
					$lt: [ '$duration', DURATIONS_INTERVAL ]
				},
				then: DURATIONS_INTERVAL / 2,
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
			$lt: DURATIONS_LIMIT
		}
	}
}

const getAverage = async (id) => {

	return Record.aggregate([
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
			$sort: {
				'_id.year': -1,
				'_id.month': -1,
				'_id.day': -1
			}
		},
		{
			$limit: 14
		}
	])

}

const getDetailed = async (id) => {

	const averageEntries = await Record.aggregate([
		{
			$match: {
				domainId: id,
				created: {
					$gte: dateWithOffset(-6)
				}
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
	])

	// No need to continue when there're no entries
	if (averageEntries.length === 0) return []

	const detailedEntries = await Record.aggregate([
		{
			$match: {
				domainId: id,
				created: {
					$gte: dateWithOffset(-6)
				}
			}
		},
		projectDuration,
		projectInterval,
		{
			$group: {
				_id: {
					$cond: {
						if: {
							$gte: [ '$duration', DURATIONS_LIMIT ]
						},
						then: DURATIONS_LIMIT,
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
	])

	return detailedEntries

}

const get = async (id, type) => {

	switch (type) {
		case DURATIONS_TYPE_AVERAGE: return getAverage(id)
		case DURATIONS_TYPE_DETAILED: return getDetailed(id)
	}

}

module.exports = {
	get
}