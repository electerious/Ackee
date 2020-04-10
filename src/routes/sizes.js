'use strict'

const { createError } = require('micro')

const sizes = require('../database/sizes')
const constants = require('../constants/sizes')
const { ALL_TIME, LAST_7_DAYS, LAST_30_DAYS } = require('../constants/dateRange')

const response = (entry) => ({
	type: 'size',
	data: {
		id: entry._id,
		count: entry.count,
		created: entry.created
	}
})

const responses = (entries) => ({
	type: 'sizes',
	data: entries.map(response)
})

const get = async (req) => {

	const { domainId } = req.params
	const { type, dateRange = LAST_7_DAYS.value } = req.query

	const types = [
		constants.SIZES_TYPE_BROWSER_HEIGHT,
		constants.SIZES_TYPE_BROWSER_RESOLUTION,
		constants.SIZES_TYPE_BROWSER_WIDTH,
		constants.SIZES_TYPE_SCREEN_HEIGHT,
		constants.SIZES_TYPE_SCREEN_RESOLUTION,
		constants.SIZES_TYPE_SCREEN_WIDTH
	]

	const dateRanges = [ ALL_TIME.value, LAST_7_DAYS.value, LAST_30_DAYS.value ]

	if (types.includes(type) === false) throw createError(400, 'Unknown type')
	if (dateRanges.includes(dateRange) === false) throw createError(400, 'Unknown date range')

	const entries = await sizes.get(domainId, type, dateRange)

	return responses(entries)

}

module.exports = {
	get
}