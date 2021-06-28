'use strict'

const domainFqNames = require('./domainFqNames')

module.exports = async (req, allowedOrigins, autoOrigin) => {
	const allowedDomains = autoOrigin ? (await domainFqNames()).join(',') : allowedOrigins

	if (allowedDomains === '*') return '*'

	if (allowedDomains != null) {
		const origins = allowedDomains.split(',')
		return origins.find((origin) => origin.includes(req.headers.origin) || origin.includes(req.headers.host))
	}
}