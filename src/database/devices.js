'use strict'

const Record = require('../schemas/Record')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateNewFields = require('../aggregations/aggregateNewFields')
const aggregateRecentFields = require('../aggregations/aggregateRecentFields')
const sortings = require('../constants/sortings')
const constants = require('../constants/devices')

const get = async (id, sorting, type, range, limit) => {

	const aggregation = (() => {
		if (type === constants.DEVICES_TYPE_NO_MODEL) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopFields(id, [ 'deviceManufacturer' ], range, limit)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewFields(id, [ 'deviceManufacturer' ], limit)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentFields(id, [ 'deviceManufacturer' ], limit)
		}
		if (type === constants.DEVICES_TYPE_WITH_MODEL) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopFields(id, [ 'deviceManufacturer', 'deviceName' ], range, limit)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewFields(id, [ 'deviceManufacturer', 'deviceName' ], limit)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentFields(id, [ 'deviceManufacturer', 'deviceName' ], limit)
		}
	})()

	return Record.aggregate(aggregation)

}

module.exports = {
	get
}