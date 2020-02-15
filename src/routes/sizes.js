'use strict'

const { createError } = require('micro')

const sizes = require('../database/sizes')

const {
	SIZES_TYPE_BROWSER_WIDTH,
	SIZES_TYPE_BROWSER_HEIGHT,
	SIZES_TYPE_SCREEN_WIDTH,
	SIZES_TYPE_SCREEN_HEIGHT
} = require('../constants/sizes')

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
	const { type } = req.query

	const entries = await sizes.get(domainId, type)

	switch (type) {
		case SIZES_TYPE_BROWSER_WIDTH: return responses(entries)
		case SIZES_TYPE_BROWSER_HEIGHT: return responses(entries)
		case SIZES_TYPE_SCREEN_WIDTH: return responses(entries)
		case SIZES_TYPE_SCREEN_HEIGHT: return responses(entries)
		default: throw createError(400, 'Unknown type')
	}

}

module.exports = {
	get
}