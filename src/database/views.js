'use strict'

const Record = require('../schemas/Record')

const {
	VIEWS_TOTAL,
	VIEWS_UNIQUE
} = require('../constants/views')

const getTotal = async (id) => {

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

const getUnique = async (id) => {

	return Record.aggregate([
		{
			$match: {
				clientId: {
					$exists: true,
					$ne: null
				},
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

const get = async (id, type) => {

	switch (type) {
		case VIEWS_TOTAL: return getTotal(id)
		case VIEWS_UNIQUE: return getUnique(id)
	}

}

module.exports = {
	get
}