'use strict'

const Record = require('../schemas/Record')

const {
	// DURATIONS_TYPE_UNIQUE,
	DURATIONS_TYPE_TOTAL
} = require('../constants/durations')

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

	return Record.aggregate([
		{
			$match: {
				domainId: id
			}
		},
		{
			$group: {
				_id: {
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
				},
				count: {
					$sum: 1
				}
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