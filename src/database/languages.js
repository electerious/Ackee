'use strict'

const Record = require('../schemas/Record')
const aggregateTopFields = require('../utils/aggregateTopFields')
const aggregateRecentFields = require('../utils/aggregateRecentFields')

const {
	LANGUAGES_SORTING_TOP,
	LANGUAGES_SORTING_RECENT
} = require('../constants/languages')

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
		case LANGUAGES_SORTING_TOP: return getTop(id)
		case LANGUAGES_SORTING_RECENT: return getRecent(id)
	}

}

module.exports = {
	get
}