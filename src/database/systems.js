'use strict'

const Record = require('../schemas/Record')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateNewFields = require('../aggregations/aggregateNewFields')
const aggregateRecentFields = require('../aggregations/aggregateRecentFields')
const sortings = require('../constants/sortings')
const constants = require('../constants/systems')

const get = async (id, sorting, type, range, limit) => {

	const aggregation = (() => {
		if (type === constants.SYSTEMS_TYPE_NO_VERSION) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopFields(id, [ 'osName' ], range, limit)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewFields(id, [ 'osName' ], limit)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentFields(id, [ 'osName' ], limit)
		}
		if (type === constants.SYSTEMS_TYPE_WITH_VERSION) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopFields(id, [ 'osName', 'osVersion' ], range, limit)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewFields(id, [ 'osName', 'osVersion' ], limit)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentFields(id, [ 'osName', 'osVersion' ], limit)
		}
	})()

	return Record.aggregate(aggregation)

}

module.exports = {
	get
}