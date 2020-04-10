'use strict'

const { createError } = require('micro')

const devices = require('../database/devices')
const constants = require('../constants/devices')
const { LAST_7_DAYS, LAST_30_DAYS, ALL_TIME } = require('../constants/dateRange')

const response = (entry) => ({
	type: 'device',
	data: {
		id: entry._id,
		count: entry.count,
		created: entry.created
	}
})

const responses = (entries) => ({
	type: 'devices',
	data: entries.map(response)
})

const get = async (req) => {

	const { domainId } = req.params
	const { sorting, type, dateRange = LAST_7_DAYS.value } = req.query

	const sortings = [
		constants.DEVICES_SORTING_TOP,
		constants.DEVICES_SORTING_RECENT
	]

	const types = [
		constants.DEVICES_WITH_MODEL,
		constants.DEVICES_NO_MODEL
	]

	const dateRanges = [
		LAST_7_DAYS.value,
		LAST_30_DAYS.value,
		ALL_TIME.value
	]

	if (sortings.includes(sorting) === false) throw createError(400, 'Unknown sorting')
	if (types.includes(type) === false) throw createError(400, 'Unknown type')
	if (dateRanges.includes(dateRange) === false) throw createError(400, 'Unknown date range')

	const entries = await devices.get(domainId, sorting, type, dateRange)

	return responses(entries)

}

module.exports = {
	get
}