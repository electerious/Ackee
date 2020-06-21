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

const anonymize = async (clientId, ignoreId) => {

	return Record.updateMany({
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