'use strict'

const Record = require('../schemas/Record')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateTopFieldsMultiple = require('../aggregations/aggregateTopFieldsMultiple')
const constants = require('../constants/sizes')

const getBrowserWidth = async (id, dateRange) => {

	return Record.aggregate(
		aggregateTopFields(id, 'browserWidth', dateRange)
	)

}

const getBrowserHeight = async (id, dateRange) => {

	return Record.aggregate(
		aggregateTopFields(id, 'browserHeight', dateRange)
	)

}

const getBrowserResolution = async (id, dateRange) => {

	return Record.aggregate(
		aggregateTopFieldsMultiple(id, [ 'browserWidth', 'browserHeight' ], dateRange)
	)

}

const getScreenWidth = async (id, dateRange) => {

	return Record.aggregate(
		aggregateTopFields(id, 'screenWidth', dateRange)
	)

}

const getScreenHeight = async (id, dateRange) => {

	return Record.aggregate(
		aggregateTopFields(id, 'screenHeight', dateRange)
	)

}

const getScreenResolution = async (id, dateRange) => {

	return Record.aggregate(
		aggregateTopFieldsMultiple(id, [ 'screenWidth', 'screenHeight' ], dateRange)
	)

}

const get = async (id, type, dateRange) => {

	switch (type) {
		case constants.SIZES_TYPE_BROWSER_HEIGHT: return getBrowserHeight(id, dateRange)
		case constants.SIZES_TYPE_BROWSER_RESOLUTION: return getBrowserResolution(id, dateRange)
		case constants.SIZES_TYPE_BROWSER_WIDTH: return getBrowserWidth(id, dateRange)
		case constants.SIZES_TYPE_SCREEN_HEIGHT: return getScreenHeight(id, dateRange)
		case constants.SIZES_TYPE_SCREEN_RESOLUTION: return getScreenResolution(id, dateRange)
		case constants.SIZES_TYPE_SCREEN_WIDTH: return getScreenWidth(id, dateRange)
	}

}

module.exports = {
	get
}