'use strict'

const Record = require('../schemas/Record')
const aggregateTopFieldsMultiple = require('../aggregations/aggregateTopFieldsMultiple')
const aggregateRecentFieldsMultiple = require('../aggregations/aggregateRecentFieldsMultiple')
const aggregateNewFields = require('../aggregations/aggregateNewFields')
const constants = require('../constants/referrers')

const getTop = async (id, range) => {

	return Record.aggregate(
		aggregateTopFieldsMultiple(id, [ 'siteReferrer' ], range)
	)

}

const getNew = async (id) => {

	return Record.aggregate(
		aggregateNewFields(id, 'siteReferrer')
	)

}

const getRecent = async (id) => {

	return Record.aggregate(
		aggregateRecentFieldsMultiple(id, [ 'siteReferrer' ])
	)

}

const get = async (id, sorting, range) => {

	switch (sorting) {
		case constants.REFERRERS_SORTING_TOP: return getTop(id, range)
		case constants.REFERRERS_SORTING_NEW: return getNew(id)
		case constants.REFERRERS_SORTING_RECENT: return getRecent(id)
	}

}

module.exports = {
	get
}