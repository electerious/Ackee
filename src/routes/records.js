'use strict'

const { send, json, createError } = require('micro')

const identifier = require('../utils/identifier')
const messages = require('../utils/messages')
const domains = require('../database/domains')
const records = require('../database/records')

const response = (entry) => ({
	type: 'record',
	data: {
		id: entry.id,
		domainId: entry.domainId,
		siteLocation: entry.siteLocation,
		siteReferrer: entry.siteReferrer,
		siteLanguage: entry.siteLanguage,
		screenWidth: entry.screenWidth,
		screenHeight: entry.screenHeight,
		screenColorDepth: entry.screenColorDepth,
		deviceName: entry.deviceName,
		deviceManufacturer: entry.deviceManufacturer,
		osName: entry.osName,
		osVersion: entry.osVersion,
		browserName: entry.browserName,
		browserVersion: entry.browserVersion,
		browserWidth: entry.browserWidth,
		browserHeight: entry.browserHeight,
		created: entry.created,
		updated: entry.updated
	}
})

const add = async (req, res) => {

	const clientId = identifier(req)
	const { domainId } = req.params
	const data = { ...await json(req), clientId, domainId }

	const domain = await domains.get(domainId)

	if (domain == null) throw createError(404, 'Unknown domain')

	// Anonymize existing entries with the same clientId to prevent that the browsing history
	// of a user is reconstructible. Will be skipped when there're no previous entries.
	await records.anonymize(clientId)

	let entry

	try {

		entry = await records.add(data)

	} catch (err) {

		if (err.name === 'ValidationError') {
			throw createError(400, messages(err.errors), err)
		}

		throw err

	}

	return send(res, 201, response(entry))

}

const update = async (req) => {

	const { recordId } = req.params

	let entry

	try {

		entry = await records.update(recordId)

	} catch (err) {

		if (err.name === 'ValidationError') {
			throw createError(400, messages(err.errors), err)
		}

		throw err

	}

	if (entry == null) throw createError(404, 'Unknown record')

	return response(entry)

}

module.exports = {
	add,
	update
}