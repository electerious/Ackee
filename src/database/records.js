'use strict'

const Record = require('../schemas/Record')
const runUpdate = require('../utils/runUpdate')

const add = async (data) => {

	return Record.create(data)

}

const update = async (id) => {

	return runUpdate(Record, id)

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
		browserHeight: null
	})

}

module.exports = {
	add,
	update,
	anonymize
}