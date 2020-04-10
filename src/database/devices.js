'use strict'

const Record = require('../schemas/Record')
const aggregateRecentFieldsMultiple = require('../aggregations/aggregateRecentFieldsMultiple')
const aggregateTopFieldsMultiple = require('../aggregations/aggregateTopFieldsMultiple')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateRecentFields = require('../aggregations/aggregateRecentFields')
const constants = require('../constants/devices')

const getTopWithModel = async (id, range) => {

	return Record.aggregate(
		aggregateTopFieldsMultiple(id, [ 'deviceManufacturer', 'deviceName' ], range)
	)
}

const getRecentWithModel = async (id) => {

	return Record.aggregate(
		aggregateRecentFieldsMultiple(id, [ 'deviceManufacturer', 'deviceName' ])
	)
}

const getTopNoModel = async (id, range) => {

	return Record.aggregate(
		aggregateTopFields(id, 'deviceManufacturer', range)
	)
}

const getRecentNoModel = async (id) => {

	return Record.aggregate(
		aggregateRecentFields(id, 'deviceManufacturer')
	)
}


const get = async (id, sorting, type, range) => {

	switch (sorting) {
		case constants.DEVICES_SORTING_TOP:
			return type === constants.DEVICES_NO_MODEL ? getTopNoModel(id, range) : getTopWithModel(id, range)
		case constants.DEVICES_SORTING_RECENT:
			return type === constants.DEVICES_NO_MODEL ? getRecentNoModel(id) : getRecentWithModel(id)
	}

}

module.exports = {
	get
}