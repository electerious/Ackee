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

const enhanceRequest = (req, key) => ({
	...req,
	query: (() => {
		try {
			return JSON.parse(req.query[key])
		} catch (err) {
			throw createError(400, `Query for ${ key } is missing or invalid`)
		}
	})()
})

const get = async (req) => {

	const results = await Promise.all([
		views.get(enhanceRequest(req, 'views')),
		pages.get(enhanceRequest(req, 'pages')),
		referrers.get(enhanceRequest(req, 'referrers')),
		durations.get(enhanceRequest(req, 'durations')),
		systems.get(enhanceRequest(req, 'systems')),
		devices.get(enhanceRequest(req, 'devices')),
		browsers.get(enhanceRequest(req, 'browsers')),
		sizes.get(enhanceRequest(req, 'sizes')),
		languages.get(enhanceRequest(req, 'languages'))
	])

	return responses(results)

}

const all = async (req) => {

	return get(req)

}

module.exports = {
	get,
	all
}