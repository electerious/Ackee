'use strict'

const Record = require('../models/Record')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateNewFields = require('../aggregations/aggregateNewFields')
const aggregateRecentFields = require('../aggregations/aggregateRecentFields')
const sortings = require('../constants/sortings')
const constants = require('../constants/systems')
const bestMatch = require('../utils/bestMatch')

const get = async (ids, sorting, type, range, limit, dateDetails) => {

	const enhance = (entries) => {

		return entries.map((entry) => ({
			id: bestMatch([
				[ `${ entry._id.osName } ${ entry._id.osVersion }`, [ entry._id.osName, entry._id.osVersion ]],
				[ `${ entry._id.osName }`, [ entry._id.osName ]]
			]),
			count: entry.count,
			created: entry.created
		}))

	}

	const aggregation = (() => {

		if (type === constants.SYSTEMS_TYPE_NO_VERSION) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopFields(ids, [ 'osName' ], range, limit, dateDetails)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewFields(ids, [ 'osName' ], limit)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentFields(ids, [ 'osName' ], limit)
		}
		if (type === constants.SYSTEMS_TYPE_WITH_VERSION) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopFields(ids, [ 'osName', 'osVersion' ], range, limit, dateDetails)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewFields(ids, [ 'osName', 'osVersion' ], limit)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentFields(ids, [ 'osName', 'osVersion' ], limit)
		}

	})()

	return enhance(
		await Record.aggregate(aggregation)
	)

}

module.exports = {
	get
}