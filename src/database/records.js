'use strict'

const Record = require('../models/Record')

const response = (entry) => ({
	id: entry.id,
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
})

const add = async (data) => {

	const enhance = (entry) => {
		return entry == null ? entry : response(entry)
	}

	return enhance(
		await Record.create(data)
	)

}

const update = async (id) => {

	const enhance = (entry) => {
		return entry == null ? entry : response(entry)
	}

	return enhance(
		await Record.findOneAndUpdate({
			id
		}, {
			$set: {
				updated: Date.now()
			}
		}, {
			new: true
		})
	)

}

const anonymize = async (clientId, ignoreId) => {

	// Don't return anything about the update
	await Record.updateMany({
		$and: [
			{ clientId },
			{
				id: {
					$ne: ignoreId
				}
			}
		]
	}, {
		clientId: undefined,
		siteLanguage: undefined,
		screenWidth: undefined,
		screenHeight: undefined,
		screenColorDepth: undefined,
		deviceName: undefined,
		deviceManufacturer: undefined,
		osName: undefined,
		osVersion: undefined,
		browserName: undefined,
		browserVersion: undefined,
		browserWidth: undefined,
		browserHeight: undefined
	})

}

const del = async (domainId) => {

	return Record.deleteMany({
		domainId
	})

}

module.exports = {
	add,
	update,
	anonymize,
	del
}