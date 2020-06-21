'use strict'

const Record = require('../schemas/Record')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateNewFields = require('../aggregations/aggregateNewFields')
const aggregateRecentFields = require('../aggregations/aggregateRecentFields')
const sortings = require('../constants/sortings')

const get = async (id, sorting, range) => {

	const aggregation = (() => {
		if (sorting === sortings.SORTINGS_TOP) return aggregateTopFields(id, [ 'siteLocation' ], range)
		if (sorting === sortings.SORTINGS_NEW) return aggregateNewFields(id, [ 'siteLocation' ])
		if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentFields(id, [ 'siteLocation' ])
	})()

	return Record.aggregate(aggregation)

}

module.exports = {
	get
}