'use strict'

const Record = require('../models/Record')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateNewFields = require('../aggregations/aggregateNewFields')
const aggregateRecentFields = require('../aggregations/aggregateRecentFields')
const sortings = require('../constants/sortings')
const languageCodes = require('../utils/languageCodes')

const get = async (ids, sorting, range, limit, dateDetails) => {

	const enhance = (entries) => {

		return entries.map((entry) => ({
			id: languageCodes[entry._id.siteLanguage] || entry._id.siteLanguage,
			count: entry.count,
			created: entry.created
		}))

	}

	const aggregation = (() => {

		if (sorting === sortings.SORTINGS_TOP) return aggregateTopFields(ids, [ 'siteLanguage' ], range, limit, dateDetails)
		if (sorting === sortings.SORTINGS_NEW) return aggregateNewFields(ids, [ 'siteLanguage' ], limit)
		if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentFields(ids, [ 'siteLanguage' ], limit)

	})()

	return enhance(
		await Record.aggregate(aggregation)
	)

}

module.exports = {
	get
}