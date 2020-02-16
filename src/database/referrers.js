'use strict'

const Record = require('../schemas/Record')
const aggregateTopFields = require('../utils/aggregateTopFields')
const aggregateRecentFields = require('../utils/aggregateRecentFields')
const aggregateNewFields = require('../utils/aggregateNewFields')

const {
	REFERRERS_SORTING_TOP,
	REFERRERS_SORTING_NEW,
	REFERRERS_SORTING_RECENT
} = require('../constants/referrers')

const getTop = async (id) => {

	return Record.aggregate(
		aggregateTopFields(id, 'siteReferrer')
	)

}

const getNew = async (id) => {

	return Record.aggregate(
		aggregateNewFields(id, 'siteReferrer')
	)

}

const getRecent = async (id) => {

	return Record.aggregate(
		aggregateRecentFields(id, 'siteReferrer')
	)

}

const get = async (id, sorting) => {

	switch (sorting) {
		case REFERRERS_SORTING_TOP: return getTop(id)
		case REFERRERS_SORTING_NEW: return getNew(id)
		case REFERRERS_SORTING_RECENT: return getRecent(id)
	}

}

module.exports = {
	get
}