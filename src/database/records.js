'use strict'

const Record = require('../schemas/Record')

const add = async (data) => {

	return Record.create(data)

}

const update = async (id) => {

	return Record.findOneAndUpdate({
		id
	}, {
		$set: {
			updated: Date.now()
		}
	}, {
		new: true
	})

}

const anonymize = async (clientId) => {

	return Record.updateMany({
		clientId
	}, {
		clientId: null,
		siteReferrer: null,
		siteLanguage: null,
		screenWidth: null,
		screenHeight: null,
		screenColorDepth: null,
		deviceName: null,
		deviceManufacturer: null,
		osName: null,
		osVersion: null,
		browserName: null,
		browserVersion: null,
		browserWidth: null,
		browserHeight: null
	})

}

module.exports = {
	add,
	update,
	anonymize
}