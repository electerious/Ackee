'use strict'

const micro = require('micro')
const { send, createError } = require('micro')
const { router, get, post, put, patch, del } = require('microrouter')

const signale = require('./utils/signale')
const pipe = require('./utils/pipe')
const isDefined = require('./utils/isDefined')
const customTrackerUrl = require('./utils/customTrackerUrl')
const requireAuth = require('./middlewares/requireAuth')
const blockDemo = require('./middlewares/blockDemo')
const ui = require('./routes/ui')
const tokens = require('./routes/tokens')
const domains = require('./routes/domains')
const records = require('./routes/records')
const overview = require('./routes/overview')
const views = require('./routes/views')
const pages = require('./routes/pages')
const referrers = require('./routes/referrers')
const languages = require('./routes/languages')
const durations = require('./routes/durations')
const sizes = require('./routes/sizes')
const systems = require('./routes/systems')
const devices = require('./routes/devices')
const browsers = require('./routes/browsers')

const catchError = (fn) => async (req, res) => {

	try {

		return await fn(req, res)

	} catch (err) {

		const isUnknownError = err.statusCode == null
		const hasOriginalError = err.originalError != null

		// Only log the full error stack when the error isn't a known API response
		if (isUnknownError === true) {
			signale.fatal(err)
			return send(res, 500, err.message)
		}

		signale.warn(hasOriginalError === true ? err.originalError.message : err.message)
		send(res, err.statusCode, err.message)

	}

}

const attachCorsHeaders = (fn) => async (req, res) => {

	const allowOrigin = (() => {

		if (process.env.ACKEE_ALLOW_ORIGIN === '*') return '*'

		if (process.env.ACKEE_ALLOW_ORIGIN) {
			const origins = process.env.ACKEE_ALLOW_ORIGIN.split(',')
			return origins.find((origin) => origin.includes(req.headers.origin) || origin.includes(req.headers.host))
		}

	})()

	if (allowOrigin != null) {
		res.setHeader('Access-Control-Allow-Origin', allowOrigin)
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS')
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
	}

	return fn(req, res)

}

const notFound = async (req) => {

	const err = new Error(`\`${ req.url }\` not found`)

	throw createError(404, 'Not found', err)

}

const routes = [

	get('/', ui.index),
	get('/index.html', ui.index),
	get('/favicon.ico', ui.favicon),
	get('/index.css', ui.styles),
	get('/index.js', ui.scripts),
	get('/tracker.js', ui.tracker),
	customTrackerUrl != null ? get(customTrackerUrl, ui.tracker) : undefined,

	post('/tokens', tokens.add),
	del('/tokens/:tokenId', tokens.del),

	get('/overview', pipe(requireAuth, overview.all)),

	post('/domains', pipe(requireAuth, blockDemo, domains.add)),
	get('/domains', pipe(requireAuth, domains.all)),
	put('/domains/:domainId', pipe(requireAuth, blockDemo, domains.update)),
	del('/domains/:domainId', pipe(requireAuth, blockDemo, domains.del)),

	post('/domains/:domainId/records', records.add),
	patch('/domains/:domainId/records/:recordId', records.update),

	get('/domains/:domainId/overview', pipe(requireAuth, overview.get)),
	get('/domains/:domainId/views', pipe(requireAuth, views.get)),
	get('/domains/:domainId/pages', pipe(requireAuth, pages.get)),
	get('/domains/:domainId/referrers', pipe(requireAuth, referrers.get)),
	get('/domains/:domainId/languages', pipe(requireAuth, languages.get)),
	get('/domains/:domainId/durations', pipe(requireAuth, durations.get)),
	get('/domains/:domainId/sizes', pipe(requireAuth, sizes.get)),
	get('/domains/:domainId/systems', pipe(requireAuth, systems.get)),
	get('/domains/:domainId/devices', pipe(requireAuth, devices.get)),
	get('/domains/:domainId/browsers', pipe(requireAuth, browsers.get)),

	get('/*', notFound),
	post('/*', notFound),
	put('/*', notFound),
	patch('/*', notFound),
	del('/*', notFound)

].filter(isDefined)

module.exports = micro(
	attachCorsHeaders(
		catchError(
			router(...routes)
		)
	)
)