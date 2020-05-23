'use strict'

const Record = require('../schemas/Record')
const aggregateTopFieldsMultiple = require('../aggregations/aggregateTopFieldsMultiple')
const aggregateRecentFieldsMultiple = require('../aggregations/aggregateRecentFieldsMultiple')
const constants = require('../constants/pages')

const getTop = async (id, range) => {

	return Record.aggregate(
		aggregateTopFieldsMultiple(id, [ 'siteLocation' ], range)
	)

}

const getRecent = async (id) => {

	return Record.aggregate(
		aggregateRecentFieldsMultiple(id, [ 'siteLocation' ])
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