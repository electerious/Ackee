'use strict'

const Record = require('../schemas/Record')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateTopFieldsMultiple = require('../aggregations/aggregateTopFieldsMultiple')
const constants = require('../constants/sizes')

const getBrowserWidth = async (id, range) => {

	return Record.aggregate(
		aggregateTopFields(id, 'browserWidth', range)
	)

}

const getBrowserHeight = async (id, range) => {

	return Record.aggregate(
		aggregateTopFields(id, 'browserHeight', range)
	)

}

const getBrowserResolution = async (id, range) => {

	return Record.aggregate(
		aggregateTopFieldsMultiple(id, [ 'browserWidth', 'browserHeight' ], range)
	)

}

const getScreenWidth = async (id, range) => {

	return Record.aggregate(
		aggregateTopFields(id, 'screenWidth', range)
	)

}

const getScreenHeight = async (id, range) => {

	return Record.aggregate(
		aggregateTopFields(id, 'screenHeight', range)
	)

}

const getScreenResolution = async (id, range) => {

	return Record.aggregate(
		aggregateTopFieldsMultiple(id, [ 'screenWidth', 'screenHeight' ], range)
	)

}

const get = async (id, type, range) => {

	switch (type) {
		case constants.SIZES_TYPE_BROWSER_HEIGHT: return getBrowserHeight(id, range)
		case constants.SIZES_TYPE_BROWSER_RESOLUTION: return getBrowserResolution(id, range)
		case constants.SIZES_TYPE_BROWSER_WIDTH: return getBrowserWidth(id, range)
		case constants.SIZES_TYPE_SCREEN_HEIGHT: return getScreenHeight(id, range)
		case constants.SIZES_TYPE_SCREEN_RESOLUTION: return getScreenResolution(id, range)
		case constants.SIZES_TYPE_SCREEN_WIDTH: return getScreenWidth(id, range)
	}

}

module.exports = {
	get
}