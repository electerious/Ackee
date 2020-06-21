'use strict'

const Record = require('../schemas/Record')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateRecentFields = require('../aggregations/aggregateRecentFields')
const aggregateNewFields = require('../aggregations/aggregateNewFields')
const sortings = require('../constants/sortings')

const get = async (id, sorting, range, limit) => {

	const aggregation = (() => {
		if (sorting === sortings.SORTINGS_TOP) return aggregateTopFields(id, [ 'siteReferrer' ], range, limit)
		if (sorting === sortings.SORTINGS_NEW) return aggregateNewFields(id, [ 'siteReferrer' ], limit)
		if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentFields(id, [ 'siteReferrer' ], limit)
	})()

	return Record.aggregate(aggregation)

}

module.exports = {
	get
}