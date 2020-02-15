'use strict'

const Record = require('../schemas/Record')
const aggregateTopFields = require('../utils/aggregateTopFields')
const aggregateRecentFields = require('../utils/aggregateRecentFields')

const {
	PAGES_SORTING_TOP,
	PAGES_SORTING_RECENT
} = require('../constants/pages')

const getTop = async (id) => {

	return Record.aggregate(
		aggregateTopFields(id, 'siteLocation')
	)

}

const getRecent = async (id) => {

	return Record.aggregate(
		aggregateRecentFields(id, 'siteLocation')
	)

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