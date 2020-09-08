'use strict'

const Record = require('../models/Record')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateNewFields = require('../aggregations/aggregateNewFields')
const aggregateRecentFields = require('../aggregations/aggregateRecentFields')
const sortings = require('../constants/sortings')
const constants = require('../constants/devices')
const bestMatch = require('../utils/bestMatch')

const get = async (ids, sorting, type, range, limit, dateDetails) => {

	const enhance = (entries) => {

		return entries.map((entry) => ({
			id: bestMatch([
				[ `${ entry._id.deviceManufacturer } ${ entry._id.deviceName }`, [ entry._id.deviceManufacturer, entry._id.deviceName ]],
				[ `${ entry._id.deviceManufacturer }`, [ entry._id.deviceManufacturer ]]
			]),
			count: entry.count,
			created: entry.created
		}))

	}

	const aggregation = (() => {

		if (type === constants.DEVICES_TYPE_NO_MODEL) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopFields(ids, [ 'deviceManufacturer' ], range, limit, dateDetails)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewFields(ids, [ 'deviceManufacturer' ], limit)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentFields(ids, [ 'deviceManufacturer' ], limit)
		}
		if (type === constants.DEVICES_TYPE_WITH_MODEL) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopFields(ids, [ 'deviceManufacturer', 'deviceName' ], range, limit, dateDetails)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewFields(ids, [ 'deviceManufacturer', 'deviceName' ], limit)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentFields(ids, [ 'deviceManufacturer', 'deviceName' ], limit)
		}

	})()

	return enhance(
		await Record.aggregate(aggregation)
	)

}

module.exports = {
	get
}