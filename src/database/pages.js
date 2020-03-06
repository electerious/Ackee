'use strict'

const Record = require('../schemas/Record')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateRecentFields = require('../aggregations/aggregateRecentFields')
const constants = require('../constants/pages')

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
		case constants.PAGES_SORTING_TOP: return getTop(id)
		case constants.PAGES_SORTING_RECENT: return getRecent(id)
	}

}

module.exports = {
	get
}