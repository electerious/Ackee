'use strict'

const Record = require('../schemas/Record')
const aggregateTopFields = require('../utils/aggregateTopFields')

const {
	SIZES_TYPE_BROWSER_WIDTH,
	SIZES_TYPE_BROWSER_HEIGHT,
	SIZES_TYPE_SCREEN_WIDTH,
	SIZES_TYPE_SCREEN_HEIGHT
} = require('../constants/sizes')

const getBrowserWidth = async (id) => {

	return Record.aggregate(
		aggregateTopFields(id, 'browserWidth')
	)

}

const getBrowserHeight = async (id) => {

	return Record.aggregate(
		aggregateTopFields(id, 'browserHeight')
	)

}

const getScreenWidth = async (id) => {

	return Record.aggregate(
		aggregateTopFields(id, 'screenWidth')
	)

}

const getScreenHeight = async (id) => {

	return Record.aggregate(
		aggregateTopFields(id, 'screenHeight')
	)

}

const get = async (id, type) => {

	switch (type) {
		case SIZES_TYPE_BROWSER_WIDTH: return getBrowserWidth(id)
		case SIZES_TYPE_BROWSER_HEIGHT: return getBrowserHeight(id)
		case SIZES_TYPE_SCREEN_WIDTH: return getScreenWidth(id)
		case SIZES_TYPE_SCREEN_HEIGHT: return getScreenHeight(id)
	}

}

module.exports = {
	get
}