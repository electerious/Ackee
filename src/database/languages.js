'use strict'

const Record = require('../schemas/Record')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateNewFields = require('../aggregations/aggregateNewFields')
const aggregateRecentFields = require('../aggregations/aggregateRecentFields')
const sortings = require('../constants/sortings')
const languageCodes = require('../utils/languageCodes')

const get = async (id, sorting, range, limit) => {

	const enhance = (entries) => {

		return entries.map((entry) => ({
			id: languageCodes[entry._id.siteLanguage] || entry._id.siteLanguage,
			count: entry.count,
			created: entry.created
		}))

	}

	const aggregation = (() => {

		if (sorting === sortings.SORTINGS_TOP) return aggregateTopFields(id, [ 'siteLanguage' ], range, limit)
		if (sorting === sortings.SORTINGS_NEW) return aggregateNewFields(id, [ 'siteLanguage' ], limit)
		if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentFields(id, [ 'siteLanguage' ], limit)

	})()

	return enhance(
		await Record.aggregate(aggregation)
	)

}

module.exports = {
	get
}