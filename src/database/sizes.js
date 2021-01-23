'use strict'

const Record = require('../models/Record')
const aggregateTopRecords = require('../aggregations/aggregateTopRecords')
const aggregateNewRecords = require('../aggregations/aggregateNewRecords')
const aggregateRecentRecords = require('../aggregations/aggregateRecentRecords')
const sortings = require('../constants/sortings')
const constants = require('../constants/sizes')

const get = async (ids, sorting, type, range, limit, dateDetails) => {

	const aggregation = (() => {

		if (sorting === sortings.SORTINGS_TOP) {
			if (type === constants.SIZES_TYPE_BROWSER_WIDTH) return aggregateTopRecords(ids, [ 'browserWidth' ], range, limit, dateDetails)
			if (type === constants.SIZES_TYPE_BROWSER_HEIGHT) return aggregateTopRecords(ids, [ 'browserHeight' ], range, limit, dateDetails)
			if (type === constants.SIZES_TYPE_BROWSER_RESOLUTION) return aggregateTopRecords(ids, [ 'browserWidth', 'browserHeight' ], range, limit, dateDetails)
			if (type === constants.SIZES_TYPE_SCREEN_WIDTH) return aggregateTopRecords(ids, [ 'screenWidth' ], range, limit, dateDetails)
			if (type === constants.SIZES_TYPE_SCREEN_HEIGHT) return aggregateTopRecords(ids, [ 'screenHeight' ], range, limit, dateDetails)
			if (type === constants.SIZES_TYPE_SCREEN_RESOLUTION) return aggregateTopRecords(ids, [ 'screenWidth', 'screenHeight' ], range, limit, dateDetails)
		}
		if (sorting === sortings.SORTINGS_NEW) {
			if (type === constants.SIZES_TYPE_BROWSER_WIDTH) return aggregateNewRecords(ids, [ 'browserWidth' ], limit)
			if (type === constants.SIZES_TYPE_BROWSER_HEIGHT) return aggregateNewRecords(ids, [ 'browserHeight' ], limit)
			if (type === constants.SIZES_TYPE_BROWSER_RESOLUTION) return aggregateNewRecords(ids, [ 'browserWidth', 'browserHeight' ], limit)
			if (type === constants.SIZES_TYPE_SCREEN_WIDTH) return aggregateNewRecords(ids, [ 'screenWidth' ], limit)
			if (type === constants.SIZES_TYPE_SCREEN_HEIGHT) return aggregateNewRecords(ids, [ 'screenHeight' ], limit)
			if (type === constants.SIZES_TYPE_SCREEN_RESOLUTION) return aggregateNewRecords(ids, [ 'screenWidth', 'screenHeight' ], limit)
		}
		if (sorting === sortings.SORTINGS_RECENT) {
			if (type === constants.SIZES_TYPE_BROWSER_WIDTH) return aggregateRecentRecords(ids, [ 'browserWidth' ], limit)
			if (type === constants.SIZES_TYPE_BROWSER_HEIGHT) return aggregateRecentRecords(ids, [ 'browserHeight' ], limit)
			if (type === constants.SIZES_TYPE_BROWSER_RESOLUTION) return aggregateRecentRecords(ids, [ 'browserWidth', 'browserHeight' ], limit)
			if (type === constants.SIZES_TYPE_SCREEN_WIDTH) return aggregateRecentRecords(ids, [ 'screenWidth' ], limit)
			if (type === constants.SIZES_TYPE_SCREEN_HEIGHT) return aggregateRecentRecords(ids, [ 'screenHeight' ], limit)
			if (type === constants.SIZES_TYPE_SCREEN_RESOLUTION) return aggregateRecentRecords(ids, [ 'screenWidth', 'screenHeight' ], limit)
		}

	})()

	const enhanceId = (id) => {

		if (type === constants.SIZES_TYPE_BROWSER_WIDTH) return `${ id.browserWidth }px`
		if (type === constants.SIZES_TYPE_BROWSER_HEIGHT) return `${ id.browserHeight }px`
		if (type === constants.SIZES_TYPE_BROWSER_RESOLUTION) return `${ id.browserWidth }px x ${ id.browserHeight }px`
		if (type === constants.SIZES_TYPE_SCREEN_WIDTH) return `${ id.screenWidth }px`
		if (type === constants.SIZES_TYPE_SCREEN_HEIGHT) return `${ id.screenHeight }px`
		if (type === constants.SIZES_TYPE_SCREEN_RESOLUTION) return `${ id.screenWidth }px x ${ id.screenHeight }px`

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