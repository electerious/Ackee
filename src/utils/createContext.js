const isDemoMode = require('./isDemoMode')
const isAuthenticated = require('./isAuthenticated')
const createDate = require('./createDate')

const createServerlessContext = async (integrationContext) => {
	return createContext(integrationContext.req, integrationContext.event.headers)
}

const createMicroContext = async (integrationContext) => {
	return createContext(integrationContext.req, integrationContext.req.headers)
}

const createContext = async (req, headers) => {
	return {
		isDemoMode,
		isAuthenticated: await isAuthenticated(headers['authorization']),
		dateDetails: createDate(headers['time-zone']),
		headers,
		req
	}
}

module.exports = {
	createServerlessContext,
	createMicroContext
}