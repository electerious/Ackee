'use strict'

const Record = require('../schemas/Record')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateRecentFields = require('../aggregations/aggregateRecentFields')
const aggregateNewFields = require('../aggregations/aggregateNewFields')
const sortings = require('../constants/sortings')

const getTop = async (id, range) => {

	return Record.aggregate(
		aggregateTopFields(id, [ 'siteReferrer' ], range)
	)

}

const getNew = async (id) => {

	return Record.aggregate(
		aggregateNewFields(id, [ 'siteReferrer' ])
	)

}

const getRecent = async (id) => {

	return Record.aggregate(
		aggregateRecentFields(id, [ 'siteReferrer' ])
	)

}

const get = async (id, sorting, range) => {

	switch (sorting) {
		case sortings.SORTINGS_TOP: return getTop(id, range)
		case sortings.SORTINGS_NEW: return getNew(id)
		case sortings.SORTINGS_RECENT: return getRecent(id)
	}

}

module.exports = {
	get
}