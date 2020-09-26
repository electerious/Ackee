const isDemoMode = require('./isDemoMode')
const isAuthenticated = require('./isAuthenticated')
const createDate = require('./createDate')

const createServerlessContext = async (integrationContext) => ({
	isDemoMode,
	isAuthenticated: await isAuthenticated(integrationContext.event.headers['authorization']),
	dateDetails: createDate(integrationContext.event.headers['time-zone']),
	req: integrationContext.req
})

const createMicroContext = async (integrationContext) => ({
	isDemoMode,
	isAuthenticated: await isAuthenticated(integrationContext.req.headers['authorization']),
	dateDetails: createDate(integrationContext.req.headers['time-zone']),
	req: integrationContext.req
})

module.exports = {
	createServerlessContext,
	createMicroContext
}