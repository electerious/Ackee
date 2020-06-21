'use strict'

const Record = require('../schemas/Record')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateNewFields = require('../aggregations/aggregateNewFields')
const aggregateRecentFields = require('../aggregations/aggregateRecentFields')
const sortings = require('../constants/sortings')
const constants = require('../constants/browsers')

const get = async (id, sorting, type, range, limit) => {

	const aggregation = (() => {
		if (type === constants.BROWSERS_TYPE_NO_VERSION) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopFields(id, [ 'browserName' ], range, limit)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewFields(id, [ 'browserName' ], limit)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentFields(id, [ 'browserName' ], limit)
		}
		if (type === constants.BROWSERS_TYPE_WITH_VERSION) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopFields(id, [ 'browserName', 'browserVersion' ], range, limit)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewFields(id, [ 'browserName', 'browserVersion' ], limit)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentFields(id, [ 'browserName', 'browserVersion' ], limit)
		}
	})()

	return Record.aggregate(aggregation)

}

module.exports = {
	get
}