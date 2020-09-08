'use strict'

const Record = require('../models/Record')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateNewFields = require('../aggregations/aggregateNewFields')
const aggregateRecentFields = require('../aggregations/aggregateRecentFields')
const sortings = require('../constants/sortings')
const constants = require('../constants/browsers')
const bestMatch = require('../utils/bestMatch')

const get = async (ids, sorting, type, range, limit, dateDetails) => {

	const enhance = (entries) => {

		return entries.map((entry) => ({
			id: bestMatch([
				[ `${ entry._id.browserName } ${ entry._id.browserVersion }`, [ entry._id.browserName, entry._id.browserVersion ]],
				[ `${ entry._id.browserName }`, [ entry._id.browserName ]]
			]),
			count: entry.count,
			created: entry.created
		}))

	}

	const aggregation = (() => {

		if (type === constants.BROWSERS_TYPE_NO_VERSION) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopFields(ids, [ 'browserName' ], range, limit, dateDetails)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewFields(ids, [ 'browserName' ], limit)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentFields(ids, [ 'browserName' ], limit)
		}
		if (type === constants.BROWSERS_TYPE_WITH_VERSION) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopFields(ids, [ 'browserName', 'browserVersion' ], range, limit, dateDetails)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewFields(ids, [ 'browserName', 'browserVersion' ], limit)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentFields(ids, [ 'browserName', 'browserVersion' ], limit)
		}

	})()

	return enhance(
		await Record.aggregate(aggregation)
	)

}

module.exports = {
	get
}