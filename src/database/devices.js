'use strict'

const Record = require('../schemas/Record')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateNewFields = require('../aggregations/aggregateNewFields')
const aggregateRecentFields = require('../aggregations/aggregateRecentFields')
const sortings = require('../constants/sortings')
const constants = require('../constants/devices')

const getTopNoModel = async (id, range) => {

	return Record.aggregate(
		aggregateTopFields(id, [ 'deviceManufacturer' ], range)
	)

}

const getNewNoModel = async (id) => {

	return Record.aggregate(
		aggregateNewFields(id, [ 'deviceManufacturer' ])
	)

}

const getRecentNoModel = async (id) => {

	return Record.aggregate(
		aggregateRecentFields(id, [ 'deviceManufacturer' ])
	)

}

const getTopWithModel = async (id, range) => {

	return Record.aggregate(
		aggregateTopFields(id, [ 'deviceManufacturer', 'deviceName' ], range)
	)

}

const getNewWithModel = async (id) => {

	return Record.aggregate(
		aggregateNewFields(id, [ 'deviceManufacturer', 'deviceName' ])
	)

}

const getRecentWithModel = async (id) => {

	return Record.aggregate(
		aggregateRecentFields(id, [ 'deviceManufacturer', 'deviceName' ])
	)

}

const get = async (id, sorting, type, range) => {

	switch (sorting) {
		case sortings.SORTINGS_TOP:
			return type === constants.DEVICES_TYPE_NO_MODEL ? getTopNoModel(id, range) : getTopWithModel(id, range)
		case sortings.SORTINGS_NEW:
			return type === constants.DEVICES_TYPE_NO_MODEL ? getNewNoModel(id) : getNewWithModel(id)
		case sortings.SORTINGS_RECENT:
			return type === constants.DEVICES_TYPE_NO_MODEL ? getRecentNoModel(id) : getRecentWithModel(id)
	}

}

module.exports = {
	get
}