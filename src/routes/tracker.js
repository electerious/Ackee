'use strict'

const { readFile } = require('fs').promises

const isProductionEnv = require('../utils/isProductionEnv')

const get = () => {

	const filePath = require.resolve('ackee-tracker')
	const data = readFile(filePath, 'utf8')

	return async (req, res) => {

		res.setHeader('Content-Type', 'text/javascript; charset=utf-8')
		res.end(await data)

	}

}

module.exports = {
	get: isProductionEnv === true ? get() : (req, res) => get()(req, res)
}