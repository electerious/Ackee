'use strict'

const Record = require('../schemas/Record')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateRecentFields = require('../aggregations/aggregateRecentFields')
const constants = require('../constants/pages')

const getTop = async (id, range) => {

	return Record.aggregate(
		aggregateTopFields(id, [ 'siteLocation' ], range)
	)

}

const getRecent = async (id) => {

	return Record.aggregate(
		aggregateRecentFields(id, [ 'siteLocation' ])
	)

}

const get = async (id, sorting, range) => {

	switch (sorting) {
		case constants.PAGES_SORTING_TOP: return getTop(id, range)
		case constants.PAGES_SORTING_RECENT: return getRecent(id)
	}

}

module.exports = {
	get
}