'use strict'

const languages = require('../database/languages')

const response = (entry) => ({
	type: 'language',
	data: {
		id: entry._id,
		count: entry.count
	}
})

const responses = (entries) => ({
	type: 'languages',
	data: entries.map(response)
})

const get = async (req) => {

	const { domainId } = req.params

	const entries = await languages.get(domainId)

	return responses(entries)

}

module.exports = {
	get
}