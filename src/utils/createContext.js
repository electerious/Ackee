'use strict'

const { getClientIp } = require('request-ip')

const config = require('./config')
const isAuthenticated = require('./isAuthenticated')
const createDate = require('./createDate')
const ignoreCookie = require('./ignoreCookie')

const createServerlessContext = (integrationContext) => {
	return createContext(integrationContext.event.headers['client-ip'], integrationContext.event.headers)
}

const createMicroContext = (integrationContext) => {
	return createContext(getClientIp(integrationContext.req), integrationContext.req.headers)
}

const createContext = async (ip, headers) => {
	return {
		isDemoMode: config.isDemoMode,
		isAuthenticated: await isAuthenticated(headers['authorization'], config.ttl),
		isIgnored: ignoreCookie.isSet(headers['cookie']),
		dateDetails: createDate(headers['time-zone']),
		userAgent: headers['user-agent'],
		ip,
		// Variables used by apollo-server-plugin-http-headers
		// See: https://github.com/b2a3e8/apollo-server-plugin-http-headers
		setCookies: [],
		setHeaders: [],
	}
}

module.exports = {
	createServerlessContext,
	createMicroContext,
}