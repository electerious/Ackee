'use strict'

const Record = require('../schemas/Record')
const dateWithOffset = require('../utils/dateWithOffset')

const {
	DURATIONS_INTERVAL,
	DURATIONS_LIMIT,
	// DURATIONS_TYPE_AVERAGE,
	DURATIONS_TYPE_TOTAL
} = require('../constants/durations')

const getAverage = async (id) => {

	const entries = await Record.aggregate([
		{
			$addFields: {
				duration: {
					$subtract: [ '$updated', '$created' ]
				}
			}
		},
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

	return entries[0].average

}

const getTotal = async (id) => {

	const average = await getAverage(id)

	return Record.aggregate([
		{
			$match: {
				domainId: id,
				created: {
					$gte: dateWithOffset(-7)
				}
			}
		},
		{
			$project: {
				duration: {
					$subtract: [ '$updated', '$created' ]
				}
			}
		},
		{
			$project: {
				unifiedDuration: {
					$multiply: [
						{
							$ceil: [
								{
									$divide: [ '$duration', DURATIONS_INTERVAL ]
								}
							]
						},
						DURATIONS_INTERVAL
					]
				}
			}
		},
		{
			$group: {
				_id: {
					$cond: {
						if: {
							$gte: [ '$unifiedDuration', DURATIONS_LIMIT ]
						},
						then: DURATIONS_LIMIT,
						else: '$unifiedDuration'
					}
				},
				count: {
					$sum: 1
				}
			}
		},
		{
			$addFields: {
				average
			}
		},
		{
			$sort: {
				_id: 1
			}
		}
	])

}

const get = async (id, type) => {

	switch (type) {
		// case DURATIONS_TYPE_AVERAGE: return getUnique(id)
		case DURATIONS_TYPE_TOTAL: return getTotal(id)
	}

}

module.exports = {
	get
}