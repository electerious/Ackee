'use strict'

const { createError } = require('micro')

const devices = require('../database/devices')
const constants = require('../constants/devices')
const ranges = require('../constants/ranges')

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
	const { sorting, type, range = ranges.RANGES_LAST_7_DAYS } = req.query

	const sortings = [
		constants.DEVICES_SORTING_TOP,
		constants.DEVICES_SORTING_RECENT
	]

	const types = [
		constants.DEVICES_TYPE_WITH_MODEL,
		constants.DEVICES_TYPE_NO_MODEL
	]

	if (sortings.includes(sorting) === false) throw createError(400, 'Unknown sorting')
	if (types.includes(type) === false) throw createError(400, 'Unknown type')
	if (ranges.toValues().includes(range) === false) throw createError(400, 'Unknown date range')

	const entries = await devices.get(domainId, sorting, type, range)

	return responses(entries)

}

module.exports = {
	get
}