'use strict'

const Record = require('../schemas/Record')

const add = async (data) => {

	return Record.create(data)

}

const update = async (id, data) => {

	return Record.findOneAndUpdate({
		id
	}, {
		$set: {
			siteReferrer: data.siteReferrer,
			siteLanguage: data.siteLanguage,
			screenWidth: data.screenWidth,
			screenHeight: data.screenHeight,
			screenColorDepth: data.screenColorDepth,
			deviceName: data.deviceName,
			deviceManufacturer: data.deviceManufacturer,
			osName: data.osName,
			osVersion: data.osVersion,
			browserName: data.browserName,
			browserVersion: data.browserVersion,
			browserWidth: data.browserWidth,
			browserHeight: data.browserHeight,
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