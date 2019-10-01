'use strict'

const Record = require('../schemas/Record')
const dateWithOffset = require('../utils/dateWithOffset')

const {
	// DURATIONS_TYPE_UNIQUE,
	DURATIONS_TYPE_TOTAL
} = require('../constants/durations')

const getAverage = async (id) => {

	const entries = await Record.aggregate([
		{
			$match: {
				domainId: id,
				created: {
					$gte: dateWithOffset(-7)
				}
			}
		},
		{
			$group: {
				_id: null,
				average: {
					$avg: {
						$subtract: [ '$updated', '$created' ]
					}
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

	const precision = 15000
	const limit = 21600000

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
					$multiply: [
						{
							$ceil: [
								{
									$divide: [
										{
											$subtract: [ '$updated', '$created' ]
										},
										precision
									]
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
							$gte: [ '$duration', limit ]
						},
						then: limit,
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