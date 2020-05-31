'use strict'

const { createError } = require('micro')

const views = require('./views')
const pages = require('./pages')
const referrers = require('./referrers')
const durations = require('./durations')
const systems = require('./systems')
const devices = require('./devices')
const browsers = require('./browsers')
const sizes = require('./sizes')
const languages = require('./languages')

const responses = (responses) => ({
	type: 'overview',
	data: responses
})

const get = async (req) => {

	const enhanceRequest = (key) => ({
		...req,
		query: (() => {
			try {
				return JSON.parse(req.query[key])
			} catch (err) {
				throw createError(400, `Query for ${ key } is missing or invalid`)
			}
		})()
	})

	const results = await Promise.all([
		views.get(enhanceRequest('views')),
		pages.get(enhanceRequest('pages')),
		referrers.get(enhanceRequest('referrers')),
		durations.get(enhanceRequest('durations')),
		systems.get(enhanceRequest('systems')),
		devices.get(enhanceRequest('devices')),
		browsers.get(enhanceRequest('browsers')),
		sizes.get(enhanceRequest('sizes')),
		languages.get(enhanceRequest('languages'))
	])

	return responses(results)

}

module.exports = {
	get
}