'use strict'

const Record = require('../models/Record')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateNewFields = require('../aggregations/aggregateNewFields')
const aggregateRecentFields = require('../aggregations/aggregateRecentFields')
const sortings = require('../constants/sortings')
const constants = require('../constants/sizes')
const bestMatch = require('../utils/bestMatch')

const get = async (ids, sorting, type, range, limit, dateDetails) => {

	const enhance = (entries) => {

		return entries.map((entry) => ({
			id: bestMatch([
				[ `${ entry._id.screenWidth }px x ${ entry._id.screenHeight }px`, [ entry._id.screenWidth, entry._id.screenHeight ]],
				[ `${ entry._id.browserWidth }px x ${ entry._id.browserHeight }px`, [ entry._id.browserWidth, entry._id.browserHeight ]],
				[ `${ entry._id.screenWidth }px`, [ entry._id.screenWidth ]],
				[ `${ entry._id.screenHeight }px`, [ entry._id.screenHeight ]],
				[ `${ entry._id.browserWidth }px`, [ entry._id.browserWidth ]],
				[ `${ entry._id.browserHeight }px`, [ entry._id.browserHeight ]]
			]),
			count: entry.count,
			created: entry.created
		}))

	}

	const aggregation = (() => {

		if (sorting === sortings.SORTINGS_TOP) {
			if (type === constants.SIZES_TYPE_BROWSER_WIDTH) return aggregateTopFields(ids, [ 'browserWidth' ], range, limit, dateDetails)
			if (type === constants.SIZES_TYPE_BROWSER_HEIGHT) return aggregateTopFields(ids, [ 'browserHeight' ], range, limit, dateDetails)
			if (type === constants.SIZES_TYPE_BROWSER_RESOLUTION) return aggregateTopFields(ids, [ 'browserWidth', 'browserHeight' ], range, limit, dateDetails)
			if (type === constants.SIZES_TYPE_SCREEN_WIDTH) return aggregateTopFields(ids, [ 'screenWidth' ], range, limit, dateDetails)
			if (type === constants.SIZES_TYPE_SCREEN_HEIGHT) return aggregateTopFields(ids, [ 'screenHeight' ], range, limit, dateDetails)
			if (type === constants.SIZES_TYPE_SCREEN_RESOLUTION) return aggregateTopFields(ids, [ 'screenWidth', 'screenHeight' ], range, limit, dateDetails)
		}
		if (sorting === sortings.SORTINGS_NEW) {
			if (type === constants.SIZES_TYPE_BROWSER_WIDTH) return aggregateNewFields(ids, [ 'browserWidth' ], limit)
			if (type === constants.SIZES_TYPE_BROWSER_HEIGHT) return aggregateNewFields(ids, [ 'browserHeight' ], limit)
			if (type === constants.SIZES_TYPE_BROWSER_RESOLUTION) return aggregateNewFields(ids, [ 'browserWidth', 'browserHeight' ], limit)
			if (type === constants.SIZES_TYPE_SCREEN_WIDTH) return aggregateNewFields(ids, [ 'screenWidth' ], limit)
			if (type === constants.SIZES_TYPE_SCREEN_HEIGHT) return aggregateNewFields(ids, [ 'screenHeight' ], limit)
			if (type === constants.SIZES_TYPE_SCREEN_RESOLUTION) return aggregateNewFields(ids, [ 'screenWidth', 'screenHeight' ], limit)
		}
		if (sorting === sortings.SORTINGS_RECENT) {
			if (type === constants.SIZES_TYPE_BROWSER_WIDTH) return aggregateRecentFields(ids, [ 'browserWidth' ], limit)
			if (type === constants.SIZES_TYPE_BROWSER_HEIGHT) return aggregateRecentFields(ids, [ 'browserHeight' ], limit)
			if (type === constants.SIZES_TYPE_BROWSER_RESOLUTION) return aggregateRecentFields(ids, [ 'browserWidth', 'browserHeight' ], limit)
			if (type === constants.SIZES_TYPE_SCREEN_WIDTH) return aggregateRecentFields(ids, [ 'screenWidth' ], limit)
			if (type === constants.SIZES_TYPE_SCREEN_HEIGHT) return aggregateRecentFields(ids, [ 'screenHeight' ], limit)
			if (type === constants.SIZES_TYPE_SCREEN_RESOLUTION) return aggregateRecentFields(ids, [ 'screenWidth', 'screenHeight' ], limit)
		}

	})()

	return enhance(
		await Record.aggregate(aggregation)
	)

}

module.exports = {
	get
}