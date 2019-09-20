'use strict'

const Record = require('../schemas/Record')
const dateWithOffset = require('../utils/dateWithOffset')

const {
	PAGES_SORTING_TOP,
	PAGES_SORTING_RECENT
} = require('../constants/pages')

const getTop = async (id) => {

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
			$group: {
				_id: '$siteLocation',
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
			$limit: 25
		}
	])

}

const getRecent = async (id) => {

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
			$sort: {
				created: -1
			}
		},
		{
			$project: {
				_id: '$siteLocation',
				created: '$created'
			}
		},
		{
			$limit: 25
		}
	])

}

const get = async (id, sorting) => {

	switch (sorting) {
		case PAGES_SORTING_TOP: return getTop(id)
		case PAGES_SORTING_RECENT: return getRecent(id)
	}

}

module.exports = {
	get
}