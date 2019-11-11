'use strict'

const Record = require('../schemas/Record')
const dateWithOffset = require('../utils/dateWithOffset')

const {
	REFERRERS_SORTING_TOP,
	REFERRERS_SORTING_NEW,
	REFERRERS_SORTING_RECENT
} = require('../constants/referrers')

const getTop = async (id) => {

	return Record.aggregate([
		{
			$match: {
				domainId: id,
				siteReferrer: {
					$ne: null
				},
				created: {
					$gte: dateWithOffset(-6)
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
			$limit: 25
		}
	])

}

const getNew = async (id) => {

	return Record.aggregate([
		{
			$match: {
				domainId: id,
				siteReferrer: {
					$ne: null
				}
			}
		},
		{
			$group: {
				_id: '$siteReferrer',
				count: {
					$sum: 1
				},
				created: {
					$first: '$created'
				}
			}
		},
		{
			$match: {
				created: {
					$gte: dateWithOffset(-6)
				}
			}
		},
		{
			$sort: {
				created: -1
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
				siteReferrer: {
					$ne: null
				},
				created: {
					$gte: dateWithOffset(-6)
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
				_id: '$siteReferrer',
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
		case REFERRERS_SORTING_TOP: return getTop(id)
		case REFERRERS_SORTING_NEW: return getNew(id)
		case REFERRERS_SORTING_RECENT: return getRecent(id)
	}

}

module.exports = {
	get
}