'use strict'

const Record = require('../schemas/Record')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateRecentFields = require('../aggregations/aggregateRecentFields')
const constants = require('../constants/languages')

const getTop = async (id, dateRange) => {

	return Record.aggregate(
		aggregateTopFields(id, 'siteLanguage', dateRange)
	)

}

const getRecent = async (id) => {

	return Record.aggregate(
		aggregateRecentFields(id, 'siteLanguage')
	)

}

const get = async (id, sorting, dateRange) => {

	switch (sorting) {
		case constants.LANGUAGES_SORTING_TOP: return getTop(id, dateRange)
		case constants.LANGUAGES_SORTING_RECENT: return getRecent(id)
	}

}

module.exports = {
	get
}