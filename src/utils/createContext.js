'use strict'

const { getClientIp } = require('request-ip')

const config = require('./config')
const isAuthenticated = require('./isAuthenticated')
const createDate = require('./createDate')
const ignoreCookie = require('./ignoreCookie')

// For serverless (AWS Lambda)
const createServerlessContext = async ({ event }) => { // eslint-disable-line require-await
	return createContext(event.headers['client-ip'], event.headers)
}

// For Express
const createExpressContext = async ({ req }) => { // eslint-disable-line require-await
	return createContext(getClientIp(req), req.headers)
}

const createContext = async (ip, headers) => {
	return {
		isDemoMode: config.isDemoMode,
		isAuthenticated: await isAuthenticated(headers['authorization'], config.ttl),
		isIgnored: ignoreCookie.isSet(headers['cookie']),
		dateDetails: createDate(headers['time-zone']),
		userAgent: headers['user-agent'],
		ip,
		// Variables used by custom httpHeadersPlugin
		setCookies: [],
		setHeaders: [],
	}
}

module.exports = {
	createServerlessContext,
	createExpressContext,
	// Keep old name for backwards compatibility during transition
	createMicroContext: createExpressContext,
}