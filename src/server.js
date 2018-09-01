'use strict'

const micro = require('micro')
const { send } = require('micro')
const { router, get, post, put, del } = require('microrouter')

const signale = require('./signale')
const pipe = require('./pipe')
const auth = require('./auth')

const ui = require('./routes/ui')
const tokens = require('./routes/tokens')
const domains = require('./routes/domains')
const records = require('./routes/records')
const views = require('./routes/views')

const catchError = (fn) => async (req, res) => {

	try {

		return await fn(req, res)

	} catch (err) {

		signale.fatal(err)

		if (err.statusCode != null) send(res, err.statusCode, err.message)
		else send(res, 500, err.message)

	}

}

module.exports = micro(
	catchError(
		router(
			get('/', ui.index),
			get('/index.css', ui.styles),
			get('/index.js', ui.scripts),
			post('/tokens', tokens.add),
			del('/tokens/:tokenId', tokens.del),
			post('/domains', pipe(auth, domains.add)),
			get('/domains', pipe(auth, domains.all)),
			put('/domains/:domainId', pipe(auth, domains.update)),
			del('/domains/:domainId', pipe(auth, domains.del)),
			post('/domains/:domainId/records', records.add),
			put('/domains/:domainId/records/:recordId', records.update),
			get('/domains/:domainId/views', pipe(auth, views.get))
		)
	)
)