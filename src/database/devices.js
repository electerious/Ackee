'use strict'

const Record = require('../models/Record')
const aggregateTopRecords = require('../aggregations/aggregateTopRecords')
const aggregateNewRecords = require('../aggregations/aggregateNewRecords')
const aggregateRecentRecords = require('../aggregations/aggregateRecentRecords')
const sortings = require('../constants/sortings')
const constants = require('../constants/devices')

const get = async (ids, sorting, type, range, limit, dateDetails) => {

	const aggregation = (() => {

		if (type === constants.DEVICES_TYPE_NO_MODEL) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopRecords(ids, [ 'deviceManufacturer' ], range, limit, dateDetails)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewRecords(ids, [ 'deviceManufacturer' ], limit)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentRecords(ids, [ 'deviceManufacturer' ], limit)
		}
		if (type === constants.DEVICES_TYPE_WITH_MODEL) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopRecords(ids, [ 'deviceManufacturer', 'deviceName' ], range, limit, dateDetails)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewRecords(ids, [ 'deviceManufacturer', 'deviceName' ], limit)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentRecords(ids, [ 'deviceManufacturer', 'deviceName' ], limit)
		}

	})()

	const enhanceId = (id) => {

		if (type === constants.DEVICES_TYPE_NO_MODEL) return `${ id.deviceManufacturer }`
		if (type === constants.DEVICES_TYPE_WITH_MODEL) return `${ id.deviceManufacturer } ${ id.deviceName }`

	}

	const enhance = (entries) => {

		return entries.map((entry) => ({
			id: enhanceId(entry._id),
			count: entry.count,
			created: entry.created
		}))

	}

	return enhance(
		await Record.aggregate(aggregation)
	)

}

module.exports = {
	get
}