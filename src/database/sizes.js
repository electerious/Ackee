'use strict'

const Record = require('../schemas/Record')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateNewFields = require('../aggregations/aggregateNewFields')
const aggregateRecentFields = require('../aggregations/aggregateRecentFields')
const sortings = require('../constants/sortings')
const constants = require('../constants/sizes')
const bestMatch = require('../utils/bestMatch')

const get = async (id, sorting, type, range, limit) => {

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
			if (type === constants.SIZES_TYPE_BROWSER_WIDTH) return aggregateTopFields(id, [ 'browserWidth' ], range, limit)
			if (type === constants.SIZES_TYPE_BROWSER_HEIGHT) return aggregateTopFields(id, [ 'browserHeight' ], range, limit)
			if (type === constants.SIZES_TYPE_BROWSER_RESOLUTION) return aggregateTopFields(id, [ 'browserWidth', 'browserHeight' ], range, limit)
			if (type === constants.SIZES_TYPE_SCREEN_WIDTH) return aggregateTopFields(id, [ 'screenWidth' ], range, limit)
			if (type === constants.SIZES_TYPE_SCREEN_HEIGHT) return aggregateTopFields(id, [ 'screenHeight' ], range, limit)
			if (type === constants.SIZES_TYPE_SCREEN_RESOLUTION) return aggregateTopFields(id, [ 'screenWidth', 'screenHeight' ], range, limit)
		}
		if (sorting === sortings.SORTINGS_NEW) {
			if (type === constants.SIZES_TYPE_BROWSER_WIDTH) return aggregateNewFields(id, [ 'browserWidth' ], limit)
			if (type === constants.SIZES_TYPE_BROWSER_HEIGHT) return aggregateNewFields(id, [ 'browserHeight' ], limit)
			if (type === constants.SIZES_TYPE_BROWSER_RESOLUTION) return aggregateNewFields(id, [ 'browserWidth', 'browserHeight' ], limit)
			if (type === constants.SIZES_TYPE_SCREEN_WIDTH) return aggregateNewFields(id, [ 'screenWidth' ], limit)
			if (type === constants.SIZES_TYPE_SCREEN_HEIGHT) return aggregateNewFields(id, [ 'screenHeight' ], limit)
			if (type === constants.SIZES_TYPE_SCREEN_RESOLUTION) return aggregateNewFields(id, [ 'screenWidth', 'screenHeight' ], limit)
		}
		if (sorting === sortings.SORTINGS_RECENT) {
			if (type === constants.SIZES_TYPE_BROWSER_WIDTH) return aggregateRecentFields(id, [ 'browserWidth' ], limit)
			if (type === constants.SIZES_TYPE_BROWSER_HEIGHT) return aggregateRecentFields(id, [ 'browserHeight' ], limit)
			if (type === constants.SIZES_TYPE_BROWSER_RESOLUTION) return aggregateRecentFields(id, [ 'browserWidth', 'browserHeight' ], limit)
			if (type === constants.SIZES_TYPE_SCREEN_WIDTH) return aggregateRecentFields(id, [ 'screenWidth' ], limit)
			if (type === constants.SIZES_TYPE_SCREEN_HEIGHT) return aggregateRecentFields(id, [ 'screenHeight' ], limit)
			if (type === constants.SIZES_TYPE_SCREEN_RESOLUTION) return aggregateRecentFields(id, [ 'screenWidth', 'screenHeight' ], limit)
		}

	})()

	return enhance(
		await Record.aggregate(aggregation)
	)

}

module.exports = {
	get
}