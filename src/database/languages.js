'use strict'

const Record = require('../schemas/Record')
const aggregateTopFields = require('../utils/aggregateTopFields')
const aggregateRecentFields = require('../utils/aggregateRecentFields')
const constants = require('../constants/languages')

const getTop = async (id) => {

	return Record.aggregate(
		aggregateTopFields(id, 'siteLanguage')
	)

}

const getRecent = async (id) => {

	return Record.aggregate(
		aggregateRecentFields(id, 'siteLanguage')
	)

}

const get = async (id, sorting) => {

	switch (sorting) {
		case constants.LANGUAGES_SORTING_TOP: return getTop(id)
		case constants.LANGUAGES_SORTING_RECENT: return getRecent(id)
	}

}

module.exports = {
	get
}