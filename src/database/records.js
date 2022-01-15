'use strict'

const Record = require('../models/Record')

const response = (entry) => ({
	id: entry.id,
	siteLocation: entry.siteLocation,
	siteReferrer: entry.siteReferrer,
	siteLanguage: entry.siteLanguage,
	source: entry.source,
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
	updated: entry.updated,
})

const add = async (data) => {
	const enhance = (entry) => {
		return entry == null ? entry : response(entry)
	}

	return enhance(
		await Record.create({
			clientId: data.clientId,
			domainId: data.domainId,
			siteLocation: data.siteLocation,
			siteReferrer: data.siteReferrer,
			siteLanguage: data.siteLanguage,
			source: data.source,
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
		}),
	)
}

const update = async (id) => {
	const enhance = (entry) => {
		return entry == null ? entry : response(entry)
	}

	return enhance(
		await Record.findOneAndUpdate({
			id,
		}, {
			$set: {
				updated: Date.now(),
			},
		}, {
			new: true,
		}),
	)
}

const anonymize = (clientId, ignoreId) => {
	// Don't return anything about the update
	return Record.updateMany({
		$and: [
			{ clientId },
			{
				id: {
					$ne: ignoreId,
				},
			},
		],
	}, {
		clientId: null,
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
		browserHeight: null,
	})
}

const del = (domainId) => {
	return Record.deleteMany({
		domainId,
	})
}

module.exports = {
	add,
	update,
	anonymize,
	del,
}