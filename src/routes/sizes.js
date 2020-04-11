'use strict'

const { createError } = require('micro')

const sizes = require('../database/sizes')
const constants = require('../constants/sizes')
const ranges = require('../constants/ranges')

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
	const { type, range } = req.query

	const types = [
		constants.SIZES_TYPE_BROWSER_HEIGHT,
		constants.SIZES_TYPE_BROWSER_RESOLUTION,
		constants.SIZES_TYPE_BROWSER_WIDTH,
		constants.SIZES_TYPE_SCREEN_HEIGHT,
		constants.SIZES_TYPE_SCREEN_RESOLUTION,
		constants.SIZES_TYPE_SCREEN_WIDTH
	]

	if (types.includes(type) === false) throw createError(400, 'Unknown type')
	if (ranges.toValues().includes(range) === false) throw createError(400, 'Unknown date range')

	const entries = await sizes.get(domainId, type, range)

	return responses(entries)

}

module.exports = {
	get
}