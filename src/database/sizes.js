'use strict'

const Record = require('../schemas/Record')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateNewFields = require('../aggregations/aggregateNewFields')
const aggregateRecentFields = require('../aggregations/aggregateRecentFields')
const sortings = require('../constants/sortings')
const constants = require('../constants/sizes')

const get = async (id, sorting, type, range) => {

	const aggregation = (() => {
		if (sorting === sortings.SORTINGS_TOP) {
			if (type === constants.SIZES_TYPE_BROWSER_WIDTH) return aggregateTopFields(id, [ 'browserWidth' ], range)
			if (type === constants.SIZES_TYPE_BROWSER_HEIGHT) return aggregateTopFields(id, [ 'browserHeight' ], range)
			if (type === constants.SIZES_TYPE_BROWSER_RESOLUTION) return aggregateTopFields(id, [ 'browserWidth', 'browserHeight' ], range)
			if (type === constants.SIZES_TYPE_SCREEN_WIDTH) return aggregateTopFields(id, [ 'screenWidth' ], range)
			if (type === constants.SIZES_TYPE_SCREEN_HEIGHT) return aggregateTopFields(id, [ 'screenHeight' ], range)
			if (type === constants.SIZES_TYPE_SCREEN_RESOLUTION) return aggregateTopFields(id, [ 'screenWidth', 'screenHeight' ], range)
		}
		if (sorting === sortings.SORTINGS_NEW) {
			if (type === constants.SIZES_TYPE_BROWSER_WIDTH) return aggregateNewFields(id, [ 'browserWidth' ])
			if (type === constants.SIZES_TYPE_BROWSER_HEIGHT) return aggregateNewFields(id, [ 'browserHeight' ])
			if (type === constants.SIZES_TYPE_BROWSER_RESOLUTION) return aggregateNewFields(id, [ 'browserWidth', 'browserHeight' ])
			if (type === constants.SIZES_TYPE_SCREEN_WIDTH) return aggregateNewFields(id, [ 'screenWidth' ])
			if (type === constants.SIZES_TYPE_SCREEN_HEIGHT) return aggregateNewFields(id, [ 'screenHeight' ])
			if (type === constants.SIZES_TYPE_SCREEN_RESOLUTION) return aggregateNewFields(id, [ 'screenWidth', 'screenHeight' ])
		}
		if (sorting === sortings.SORTINGS_RECENT) {
			if (type === constants.SIZES_TYPE_BROWSER_WIDTH) return aggregateRecentFields(id, [ 'browserWidth' ])
			if (type === constants.SIZES_TYPE_BROWSER_HEIGHT) return aggregateRecentFields(id, [ 'browserHeight' ])
			if (type === constants.SIZES_TYPE_BROWSER_RESOLUTION) return aggregateRecentFields(id, [ 'browserWidth', 'browserHeight' ])
			if (type === constants.SIZES_TYPE_SCREEN_WIDTH) return aggregateRecentFields(id, [ 'screenWidth' ])
			if (type === constants.SIZES_TYPE_SCREEN_HEIGHT) return aggregateRecentFields(id, [ 'screenHeight' ])
			if (type === constants.SIZES_TYPE_SCREEN_RESOLUTION) return aggregateRecentFields(id, [ 'screenWidth', 'screenHeight' ])
		}
	})()

	return Record.aggregate(aggregation)

}

module.exports = {
	get
}