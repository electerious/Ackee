'use strict'

const Record = require('../schemas/Record')

const get = async (id) => {

	return Record.aggregate([
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
	])

}

module.exports = {
	get
}