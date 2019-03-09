'use strict'

const { readFile } = require('fs')
const { promisify } = require('util')

const preload = require('../preload')

const optimize = process.env.NODE_ENV !== 'development'

const get = async () => {

	const filePath = require.resolve('ackee-tracker')

	return promisify(readFile)(filePath, 'utf8')

}

module.exports = {
	get: optimize === true ? preload(get) : get
}