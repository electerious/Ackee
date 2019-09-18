'use strict'

const Record = require('../schemas/Record')
const dateWithOffset = require('../utils/dateWithOffset')

const get = async (id) => {

	return Record.aggregate([
		{
			$match: {
				domainId: id,
				siteLanguage: {
					$ne: null
				},
				created: {
					$gte: dateWithOffset(-7)
				}
			}
		},
		{
			$sort: {
				created: -1
			}
		},
		{
			$project: {
				_id: '$siteLanguage'
			}
		},
		{
			$limit: 25
		}
	])

}

module.exports = {
	get
}