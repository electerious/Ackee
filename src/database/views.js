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
		}
	])

}

module.exports = {
	get
}