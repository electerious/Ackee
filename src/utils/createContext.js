'use strict'

const { getClientIp } = require('request-ip')

const isDemoMode = require('./isDemoMode')
const isAuthenticated = require('./isAuthenticated')
const createDate = require('./createDate')

const createServerlessContext = async (integrationContext) => {
	return createContext(integrationContext.event.headers['client-ip'], integrationContext.event.headers)
}

const createMicroContext = async (integrationContext) => {
	return createContext(getClientIp(integrationContext.req), integrationContext.req.headers)
}

const createContext = async (ip, headers) => {
	return {
		isDemoMode,
		isAuthenticated: await isAuthenticated(headers['authorization']),
		dateDetails: createDate(headers['time-zone']),
		userAgent: headers['user-agent'],
		ip
	}
}

module.exports = {
	createServerlessContext,
	createMicroContext
}