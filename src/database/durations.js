'use strict'

const Record = require('../schemas/Record')
const dateWithOffset = require('../utils/dateWithOffset')

const {
	DURATIONS_TRACKING_INTERVAL,
	DURATIONS_GROUP_INTERVAL,
	DURATIONS_LIMIT,
	// DURATIONS_TYPE_AVERAGE,
	DURATIONS_TYPE_DETAILED
} = require('../constants/durations')

const getDetailed = async (id) => {

	// The time that elapsed between the creation and updating of records.
	const addFieldsDuration = {
		$addFields: {
			duration: {
				$subtract: [ '$updated', '$created' ]
			}
		}
	}

	// Ackee tracks durations in an interval, but some durations are between
	// possible interval times. This could be caused by a network delay or the
	// browser who's throttling JS execution. This step rounds all durations
	// down to the nearest possible interval to get rid of inaccuracy.
	const projectToTrackingInterval = {
		$project: {
			duration: {
				$multiply: [
					{
						$floor: [
							{
								$divide: [ '$duration', DURATIONS_TRACKING_INTERVAL ]
							}
						]
					},
					DURATIONS_TRACKING_INTERVAL
				]
			}
		}
	}

	// Ackee can't show all durations. It's just too much. This step groups
	// all durations by rounding them up to the nearest group interval.
	const projectToGroupInterval = {
		$project: {
			duration: {
				$multiply: [
					{
						$ceil: [
							{
								$divide: [ '$duration', DURATIONS_GROUP_INTERVAL ]
							}
						]
					},
					DURATIONS_GROUP_INTERVAL
				]
			}
		}
	}

	// Group durations. All durations above the limit will be grouped together
	// as they are usually not relevant.
	const groupDurationWithLimit = {
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
	}

	const averageEntries = await Record.aggregate([
		addFieldsDuration,
		{
			$match: {
				domainId: id,
				created: {
					$gte: dateWithOffset(-7)
				},
				duration: {
					$lt: DURATIONS_LIMIT
				}
			}
		},
		projectToTrackingInterval,
		{
			$group: {
				_id: null,
				average: {
					$avg: '$duration'
				}
			}
		},
		{
			$project: {
				average: {
					$ceil: [ '$average' ]
				}
			}
		}
	])

	const detailedEntries = await Record.aggregate([
		addFieldsDuration,
		{
			$match: {
				domainId: id,
				created: {
					$gte: dateWithOffset(-7)
				}
			}
		},
		projectToTrackingInterval,
		projectToGroupInterval,
		groupDurationWithLimit,
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
		// case DURATIONS_TYPE_AVERAGE: return getAverage(id)
		case DURATIONS_TYPE_DETAILED: return getDetailed(id)
	}

}

module.exports = {
	get
}