'use strict'

const Record = require('../schemas/Record')
const dateWithOffset = require('../utils/dateWithOffset')

const {
	// DURATIONS_TYPE_UNIQUE,
	DURATIONS_TYPE_TOTAL
} = require('../constants/durations')

const precision = 15000
const limit = 3600000

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
					$lt: limit
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

// const getUnique = async (id) => {

// 	return Record.aggregate([
// 		{
// 			$match: {
// 				clientId: {
// 					$exists: true,
// 					$ne: null
// 				},
// 				domainId: id
// 			}
// 		},
// 		{
// 			$group: {
// 				_id: {
// 					day: {
// 						$dayOfMonth: '$created'
// 					},
// 					month: {
// 						$month: '$created'
// 					},
// 					year: {
// 						$year: '$created'
// 					}
// 				},
// 				count: {
// 					$sum: 1
// 				}
// 			}
// 		},
// 		{
// 			$sort: {
// 				'_id.year': -1,
// 				'_id.month': -1,
// 				'_id.day': -1
// 			}
// 		},
// 		{
// 			$limit: 14
// 		}
// 	])

// }

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
									$divide: [ '$duration', precision ]
								}
							]
						},
						precision
					]
				}
			}
		},
		{
			$group: {
				_id: {
					$cond: {
						if: {
							$gte: [ '$unifiedDuration', limit ]
						},
						then: limit,
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
		// case DURATIONS_TYPE_UNIQUE: return getUnique(id)
		case DURATIONS_TYPE_TOTAL: return getTotal(id)
	}

}

module.exports = {
	get
}