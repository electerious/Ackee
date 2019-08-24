'use strict'

const { readFile } = require('fs').promises

const preload = require('../utils/preload')
const isProductionEnv = require('../utils/isProductionEnv')

const get = async () => {

	const filePath = require.resolve('ackee-tracker')

	return readFile(filePath, 'utf8')

}

module.exports = {
	get: isProductionEnv === true ? preload(get) : get
}