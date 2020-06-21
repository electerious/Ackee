'use strict'

const Record = require('../schemas/Record')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const constants = require('../constants/sizes')

// TODO: Add support for sorting
const get = async (id, type, range) => {

	const aggregation = (() => {
		if (type === constants.SIZES_TYPE_BROWSER_WIDTH) return aggregateTopFields(id, [ 'browserWidth' ], range)
		if (type === constants.SIZES_TYPE_BROWSER_HEIGHT) return aggregateTopFields(id, [ 'browserHeight' ], range)
		if (type === constants.SIZES_TYPE_BROWSER_RESOLUTION) return aggregateTopFields(id, [ 'browserWidth', 'browserHeight' ], range)
		if (type === constants.SIZES_TYPE_SCREEN_WIDTH) return aggregateTopFields(id, [ 'screenWidth' ], range)
		if (type === constants.SIZES_TYPE_SCREEN_HEIGHT) return aggregateTopFields(id, [ 'screenHeight' ], range)
		if (type === constants.SIZES_TYPE_SCREEN_RESOLUTION) return aggregateTopFields(id, [ 'screenWidth', 'screenHeight' ], range)
	})()

	return Record.aggregate(aggregation)

}

module.exports = {
	get
}