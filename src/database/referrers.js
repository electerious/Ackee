'use strict'

const Record = require('../schemas/Record')
const dateWithOffset = require('../utils/dateWithOffset')

const get = async (id) => {

	return Record.aggregate([
		{
			$match: {
				domainId: id,
				siteReferrer: {
					$ne: null
				},
				created: {
					$gte: dateWithOffset(-7)
				}
			}
		},
		{
			$group: {
				_id: '$siteReferrer',
				count: {
					$sum: 1
				}
			}
		},
		{
			$sort: {
				count: -1
			}
		},
		{
			$limit: 20
		}
	])

}

module.exports = {
	get
}