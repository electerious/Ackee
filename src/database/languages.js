'use strict'

const Record = require('../schemas/Record')
const dateWithOffset = require('../utils/dateWithOffset')

const {
	LANGUAGES_SORTING_TOP,
	LANGUAGES_SORTING_RECENT
} = require('../constants/languages')

const getTop = async (id) => {

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
			$group: {
				_id: '$siteLanguage',
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

const get = async (id, sorting) => {

	switch (sorting) {
		case LANGUAGES_SORTING_TOP: return getTop(id)
		case LANGUAGES_SORTING_RECENT: return getRecent(id)
	}

}

module.exports = {
	get
}