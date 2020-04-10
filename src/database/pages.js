'use strict'

const Record = require('../schemas/Record')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateRecentFields = require('../aggregations/aggregateRecentFields')
const constants = require('../constants/pages')

const getTop = async (id, dateRange) => {

	return Record.aggregate(
		aggregateTopFields(id, 'siteLocation', dateRange)
	)

}

const getRecent = async (id) => {

	return Record.aggregate(
		aggregateRecentFields(id, 'siteLocation')
	)

}

const get = async (id, sorting, dateRange) => {

	switch (sorting) {
		case constants.PAGES_SORTING_TOP: return getTop(id, dateRange)
		case constants.PAGES_SORTING_RECENT: return getRecent(id)
	}

}

module.exports = {
	get
}