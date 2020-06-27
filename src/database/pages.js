'use strict'

const Record = require('../schemas/Record')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateNewFields = require('../aggregations/aggregateNewFields')
const aggregateRecentFields = require('../aggregations/aggregateRecentFields')
const sortings = require('../constants/sortings')

const get = async (id, sorting, range, limit) => {

	const enhance = (entries) => {

		return entries.map((entry) => ({
			id: entry._id.siteLocation,
			count: entry.count,
			created: entry.created
		}))

	}

	const aggregation = (() => {

		if (sorting === sortings.SORTINGS_TOP) return aggregateTopFields(id, [ 'siteLocation' ], range, limit)
		if (sorting === sortings.SORTINGS_NEW) return aggregateNewFields(id, [ 'siteLocation' ], limit)
		if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentFields(id, [ 'siteLocation' ], limit)

	})()

	return enhance(
		await Record.aggregate(aggregation)
	)

}

module.exports = {
	get
}