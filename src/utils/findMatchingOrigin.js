'use strict'

const fullyQualifiedDomainNames = require('./fullyQualifiedDomainNames')

const findOrigin = (req, origins) => {
	return origins.find((origin) => origin.includes(req.headers.origin) || origin.includes(req.headers.host))
}

module.exports = async (req, allowedOrigins, autoOrigin) => {
	if (autoOrigin === true) {
		const origins = await fullyQualifiedDomainNames()
		return findOrigin(req, origins)
	}

	if (allowedOrigins === '*') return '*'

	if (allowedOrigins != null) {
		const origins = allowedOrigins.split(',')
		return findOrigin(req, origins)
	}
}